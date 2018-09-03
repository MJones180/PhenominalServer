const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = async (parent, { amount, email, token }, ctx) => (
  new Promise(async (done) => {
    // Ensure a user token exists
    ctx.user();

    // Grab the user's balance and ID
    const { balance: startingBalance, userID } = await ctx.resolvers.Query.grabUserBalance(parent, {}, ctx);

    // Add funds, returns user information as well for the confirmation
    const addFunds = async (balance, stripeID) => {
      const resultData = `
        {
          id
          balance
          user {
            nameFirst
            nameLast
          }
        }
      `;
      return ctx.db.mutation.createTransaction({
        data: {
          amount,
          balance,
          stripeID,
          type: 'ADD_FUNDS',
          user: {
            connect: {
              id: userID,
            },
          },
        },
      }, resultData);
    };

    // Create the Stripe charge for the given amount (in cents)
    stripe.charges.create({
      amount,
      currency: 'usd',
      description: 'Funds Addition',
      source: token,
    }, async (err, { id: stripeID, balance_transaction }) => (
      // Grab the funds the user will actually receive after processing (the net)
      stripe.balance.retrieveTransaction(balance_transaction, async (err, { net }) => {
        // Add the funds to the user's balance as a new transaction
        const {
          balance,
          id: transactionID,
          user: userData,
        } = await addFunds(startingBalance + net, stripeID);
        // The transactional information for the confirmation
        const transactionData = {
          amountCharged: amount,
          amountReceived: net,
          balance,
          email,
          transactionID,
        };
        // Send an email with the confirmation
        ctx.utils.email.addFundsConfirmation({
          transactionData,
          userData,
        });
        // The funds are added
        done(transactionData);
      })
    ));
  })
);
