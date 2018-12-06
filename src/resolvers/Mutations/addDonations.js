const eachSeries = require('async/eachSeries');
const forEach = require('lodash/forEach');
const get = require('lodash/get');
const reverse = require('lodash/reverse');

module.exports = async (parent, { amount, events }, ctx) => (
  ctx.utils.wait(async (done, reject) => {
    // Grab the user's id
    const user = await ctx.currentUser();

    // Grab the user's balance
    let { balance } = await user.grabBalance();

    // Make sure the donation amount is not greater than the current balance
    // Accounts for the sum of the batch of donations
    if ((amount * events.length) > balance) {
      reject(new ctx.utils.errors.InsufficientFunds());
      return;
    }

    const preferences = await ctx.client.user({ id: user.id }).preferences();

    // Add funds, returns user information as well for the confirmation
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

    // The data to return
    const transactionsData = {
      amount,
      balances: [],
      events: [],
      ids: [],
    };

    eachSeries(events, (eventID, cb) => (
      setTimeout(async () => {
        balance -= amount;
        // Submit the donation
        const { id, event } = await addDonation(eventID);
        // Push the data that will be returned
        transactionsData.balances.push(balance);
        transactionsData.events.push(get(event, 'charity.name') || get(event, 'specialFundraiser.name'));
        transactionsData.ids.push(id);
        cb(null);
      }, 1000)
    ), () => {
      // Reverse the values in each of the arrays
      // This makes it so the newest balance shows first
      forEach(transactionsData, value => reverse(value));
      // Check to see if the user has confirmation emails enabled
      if (preferences.allowDonationEmails) {
        // Send an email with the confirmation
        ctx.utils.email.donationConfirmation({
          user,
          transactionsData,
        });
      }
      // Return the data back to the client
      done(transactionsData);
    });
  })
);
