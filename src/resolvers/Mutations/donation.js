const eachSeries = require('async/eachSeries');
const get = require('lodash/get');
const includes = require('lodash/includes');
const map = require('lodash/map');
const userLoops = require('../Queries/userLoops');

module.exports = async (parent, { amount, events }, ctx) => (
  ctx.utils.wait(async (done, reject) => {
    // Grab the user's information
    const user = await ctx.currentUser();

    // Grab the user's balance (and key)
    let { balance, key: keyNumber } = await user.grabBalance();
    // Grab the key number
    keyNumber = ctx.utils.transactionKey.getNumber(keyNumber);

    // Make sure the donation amount is not greater than the current balance
    // Accounts for the sum of the batch of donations
    if ((amount * events.length) > balance) {
      // End the script and throw an error
      return reject(new ctx.utils.errors.InsufficientFunds());
    }

    // Grab the user's preferences
    const { allowDonationEmails } = await ctx.client.user({ id: user.id }).preferences();

    // Create the transaction, returns event information
    const addDonation = async (eventID) => {
      const resultData = `
        {
          id
          event {
            charity {
              name
            }
            specialFundraiser {
              name
            }
          }
        }
      `;
      return ctx.binding.mutation.createTransaction({
        data: {
          amount,
          balance,
          key: ctx.utils.transactionKey.generate(user.id, ++keyNumber),
          type: 'DONATION',
          event: {
            connect: {
              id: eventID,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      }, resultData);
    };

    // Grab the Looped events for today
    const grabLoopedEvents = async () => {
      // Grab the current date
      const dateToday = new Date();
      // Remove hours, minutes, seconds, and ms from date
      dateToday.setUTCHours(0, 0, 0, 0);
      // Today's date in ISO format
      dateToday.toISOString();

      // Grab all donations from today
      const transactions = await ctx.client
        .user({ id: user.id })
        .transactions({
          orderBy: 'createdAt_DESC',
          where: {
            // Transaction must be from today
            createdAt_gte: dateToday,
            // Must be a donation
            type: 'DONATION',
          },
        })
        // Return the event IDs
        .$fragment(`
          fragment TransactionEvent on Transaction {
            event {
              id
            }
          }
        `);

      // Map all of the event IDs
      return map(transactions, ({ event }) => event.id);
    };

    // All events that have already received Loops today
    const loopedEvents = await grabLoopedEvents();

    // Grab the user's current Loop count
    let loopCount = await userLoops(parent, { username: user.username }, ctx);

    // New Loops added
    let loopsGained = 0;

    // Add a new Loop
    const addLoop = async eventID => (
      ctx.client.createLoop({
        count: ++loopCount,
        event: {
          connect: {
            id: eventID,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      })
    );

    // Newly added transactions
    const transactions = [];

    // Loop through each of the events
    eachSeries(events, async (eventID) => {
      // Update the balance
      balance -= amount;
      // Submit the donation
      const { id: transactionID, event } = await addDonation(eventID);
      // Push the data to the front of the array
      transactions.unshift({
        balance,
        event: get(event, 'charity.name') || get(event, 'specialFundraiser.name'),
        id: transactionID,
      });
      // Check if the donation is Loop eligible
      if (!includes(loopedEvents, eventID)) {
        // Add the Loop
        addLoop(eventID);
        // Append to the Looped events
        loopedEvents.push(eventID);
        // Increase the Loops gained by 1
        loopsGained++;
      }
    }, () => {
      // Check to see if the user has confirmation emails enabled
      if (allowDonationEmails) {
        // Send an email with the confirmation
        ctx.utils.email.donationConfirmation({
          amount,
          transactions,
          user,
        });
      }

      console.log('LoopsGained: ', loopsGained);
      // Return the data back to the client
      done({
        amount,
        loopCount,
        loopsGained,
        transactions,
      });
    });
  })
);
