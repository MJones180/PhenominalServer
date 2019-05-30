const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Set the API version
stripe.setApiVersion('2019-03-14');

module.exports = async (parent, { amount, token }, ctx) => (
  new Promise(async (done) => {
    const { email, grabBalance, id: userID, nameFirst, nameLast } = await ctx.currentUser();

    // Add funds, returns user information as well for the confirmation
    const addFunds = async (amountNet, chargeID, balance) => (
      ctx.client.createFunds({
        amountAdded: amount,
        amountNet,
        chargeID,
        transaction: {
          create: {
            balance,
            user: {
              connect: {
                id: userID,
              },
            },
          },
        },
        user: {
          connect: {
            id: userID,
          },
        },
      })
    );

    // Create the Stripe charge for the given amount (in cents)
    stripe.charges.create({
      amount,
      currency: 'usd',
      description: 'Funds Addition',
      source: token,
    }, async (err, { id: chargeID, balance_transaction }) => (
      // Grab the funds the user will actually receive after processing (the net)
      stripe.balanceTransactions.retrieve(balance_transaction, async (err, { net }) => {
        const newBalance = (await grabBalance()) + net;
        // Add the funds
        const { id: transactionID } = await addFunds(net, chargeID, newBalance);
        // The transactional information for the confirmation
        const transactionData = {
          amountCharged: amount,
          amountReceived: net,
          balance: newBalance,
          transactionID,
        };
        // Send an email with the confirmation
        ctx.utils.email.addFundsConfirmation(transactionData, email, nameFirst, nameLast);
        // The funds are added
        done(transactionData);
      })
    ));
  })
);
