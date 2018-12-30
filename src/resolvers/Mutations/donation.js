const eachSeries = require('async/eachSeries');
const get = require('lodash/get');

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

    // Newly added transactions
    const transactions = [];

    eachSeries(events, async (eventID) => {
      // Update the balance
      balance -= amount;
      // Submit the donation
      const { id, event } = await addDonation(eventID);
      // Push the data to the front of the array
      transactions.unshift({
        balance,
        event: get(event, 'charity.name') || get(event, 'specialFundraiser.name'),
        id,
      });
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
      // Return the data back to the client
      done({
        amount,
        transactions,
      });
    });
  })
);
