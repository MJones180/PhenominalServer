const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Set the API version
stripe.setApiVersion('2019-03-14');

module.exports = async (parent, { amount, eventID }, ctx) => (
  ctx.utils.wait(async (done, reject) => {
    // Grab the user's information
    const { email, grabBalance, id: userID, nameFirst, nameLast, username } = await ctx.currentUser();

    // Grab the user's balance
    const balance = await grabBalance();

    // ====================
    // Ensure Funds
    // ====================

    // Make sure the donation amount is not greater than the current balance
    if (amount > balance) {
      // End the script and throw an error
      return reject(new ctx.utils.errors.InsufficientFunds());
    }

    // ====================
    // Process donation
    // ====================

    // Charity info
    const { connectedAccountID, name: charityName } = await ctx.client.event({ id: eventID }).charity();

    const newBalance = balance - amount;

    const createTransaction = async () => (
      ctx.client.createTransaction({
        balance: newBalance,
        user: { connect: { id: userID } },
      })
    );

    const { id: transactionID } = await createTransaction();

    const { funds } = await ctx.binding.query.user({ where: { id: userID } },
      `{
        funds(
          where: { donations_none: { subBalance: 0 } }
          orderBy: createdAt_ASC
        ) {
          id
          amountNet
          chargeID
          donations(first: 1, orderBy: createdAt_DESC) {
            subBalance
          }
        }
      }`);

    const donate = (fundsIndex, amountLeft) => {
      const { amountNet, chargeID, donations, id: sourceID } = funds[fundsIndex];
      const fundsBalance = donations.length ? donations[0].subBalance : amountNet;
      const process = (partitionedAmount, subBalance) => (
        stripe.transfers.create({
          amount: partitionedAmount,
          currency: 'usd',
          destination: connectedAccountID,
          source_transaction: chargeID,
        }).then(({ id: transferID }) => (
          ctx.client.createDonation({
            amount: partitionedAmount,
            batchKey: transactionID.toString(),
            subBalance,
            transferID,
            event: { connect: { id: eventID } },
            source: { connect: { id: sourceID } },
            transaction: { connect: { id: transactionID } },
          })
        ))
      );
      if (amountLeft > fundsBalance) {
        process(fundsBalance, 0);
        donate(fundsIndex + 1, amountLeft - fundsBalance);
      } else process(amountLeft, fundsBalance - amountLeft);
    };

    donate(0, amount);


    // ====================
    // First Donation Halo
    // ====================

    // Add the firstDonation Halo if needed
    ctx.utils.halos.checkCompletion(userID, username, 'firstDonation');

    // ====================
    // Loops
    // ====================

    const updateLoops = async () => {
      // Grab the current date
      const dateToday = new Date();
      // Remove hours, minutes, seconds, and ms from date
      dateToday.setUTCHours(0, 0, 0, 0);
      // Today's date in ISO format
      dateToday.toISOString();
      const loopExists = await ctx.client.$exists.donation({
        createdAt_gte: dateToday,
      }, {
        source: { user: { id: userID } },
      });


      // Grab the user's current Loop count
      let { count: loopCount } = await ctx.utils.loops.grabLoops({ username });


      let loopGained = false;

      // Check if the donation is Loop eligible
      if (!loopExists) {
        loopCount += 1;
        // Add the Loop
        await ctx.client.createLoop({
          // Increase the loopCount by 1
          count: loopCount,
          event: {
            connect: {
              id: eventID,
            },
          },
          user: {
            connect: {
              id: userID,
            },
          },
        });
        // Loop gained
        loopGained = true;
      }

      return { loopCount, loopGained };
    };

    const { loopCount, loopGained } = await updateLoops();

    // Add the loopCount Halo if needed
    ctx.utils.halos.checkCompletion(userID, username, 'loopCount', loopCount);

    // ====================
    // Dots
    // ====================

    // The Dot boost, based on Loop count
    const { boost } = ctx.utils.loopStage(loopCount);
    // The amount of Dots given for donating
    // Increase the total newly added Dots
    const dotsGained = 50 * boost;

    // Add the new Dots
    const dotTotal = await ctx.utils.dots.addDots({
      action: `Donation (Boost ${boost}x)`,
      amount: dotsGained,
      username,
    });

    // ====================
    // Confirmation Email
    // ====================

    const transactionData = {
      amount,
      balance: newBalance,
      charityName,
      transactionID,
    };

    // Grab the user's preferences
    const { allowDonationEmails } = await ctx.client.user({ id: userID }).preferences();

    // Check to see if the user has confirmation emails enabled
    if (allowDonationEmails) {
      // Send an email with the confirmation
      ctx.utils.email.donationConfirmation(transactionData, email, nameFirst, nameLast);
    }

    // Return the data back to the client
    done({
      ...transactionData,
      dotTotal,
      dotsGained,
      loopCount,
      loopGained,
    });
  })
);
