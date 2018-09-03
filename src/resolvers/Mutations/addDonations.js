const eachSeries = require('async/eachSeries');
const forEach = require('lodash/forEach');
const get = require('lodash/get');
const reverse = require('lodash/reverse');

module.exports = async (parent, { amount, email, events }, ctx) => (
  new Promise(async (done, reject) => {
    // Ensure a user token exists
    ctx.user();

    // Grab the user's balance
    let { balance } = await ctx.resolvers.Query.grabUserBalance(parent, {}, ctx);

    // Make sure the donation amount is not greater than the current balance
    // Accounts for the sum of the batch of donations
    if ((amount * events.length) > balance) {
      reject(new ctx.utils.errors.InsufficientFunds());
      return;
    }

    // Grab the user's data
    const user = await ctx.resolvers.Query.currentUser(parent, {}, ctx, '{ id nameFirst nameLast preferences { allowDonationEmails } }');
    // Add the email to the user's data
    user.email = email;

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
      return ctx.db.mutation.createTransaction({
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
      if (user.preferences.allowDonationEmails) {
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
