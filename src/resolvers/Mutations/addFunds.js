const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Set the API version
stripe.setApiVersion('2018-11-08');

module.exports = async (parent, { amount, token }, ctx) => (
  new Promise(async (done) => {
    // Grab the user's email and ID
    const { email, grabBalance, id: userID } = await ctx.currentUser();

    // Grab the user's balance (and key)
    const balanceInfo = await grabBalance();
    // Starting balance
    const startingBalance = balanceInfo.balance;
    // Grab the key number
    let keyNumber = ctx.utils.transactionKey.getNumber(balanceInfo.key);

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
      return ctx.binding.mutation.createTransaction({
        data: {
          amount,
          balance,
          key: ctx.utils.transactionKey.generate(userID, ++keyNumber),
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
