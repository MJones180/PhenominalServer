const moment = require('moment');

module.exports = async (parent, { amount, token }, ctx) => (
  new Promise(async (done) => {
    // Current user info
    const { email, grabBalance, id: userID, nameFirst, nameLast } = await ctx.currentUser();

    // Add the funds to Phenominal
    const addFunds = async (amountNet, chargeID, balance) => (
      // Transaction is created first so that its ID can easily be returned
      ctx.client.createTransaction({
        balance,
        // Create the funds
        funds: {
          create: {
            amountAdded: amount,
            amountNet,
            chargeID,
            user: { connect: { id: userID } },
          },
        },
        user: { connect: { id: userID } },
      })
    );

    // Process the payment in Stripe as a Charge
    ctx.utils.stripe.charges.create({
      amount, // In cents
      currency: 'usd',
      description: 'Funds Addition',
      source: token, // Payment method
    }, async (err, { id: chargeID, balance_transaction }) => (
      // Grab the charge's net payout after fees
      ctx.utils.stripe.balanceTransactions.retrieve(balance_transaction, async (err, { net }) => {
        // Updated balance after the funds addition
        const newBalance = (await grabBalance()) + net;
        // Add the funds, grab info for the confirmation
        const { createdAt: date, id: transactionID } = await addFunds(net, chargeID, newBalance);
        // The deadline for which the funds will automatically be donated
        const expiration = moment(date).add(80, 'days');
        // The transactional information for the confirmation
        const transactionData = {
          amountCharged: amount,
          amountReceived: net,
          balance: newBalance,
          date,
          expiration,
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
