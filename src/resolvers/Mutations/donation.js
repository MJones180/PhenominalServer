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
    // Process Donation
    // ====================

    // Charity info
    const [{ charity: { connectedAccountID, name: charityName } }] = await ctx.utils.grabEvents.current({ where: { id: eventID } }, '{ charity { connectedAccountID name} }');

    // Balance after donating
    const newBalance = balance - amount;

    // Create the transaction that links to the donations
    const createTransaction = async () => (
      ctx.client.createTransaction({
        balance: newBalance,
        user: { connect: { id: userID } },
      })
    );

    // Grab the date and transaction's ID for the confirmation and linking the donations
    const { createdAt: date, id: transactionID } = await createTransaction();

    // Grab the user's funds that have an active balance
    const { funds } = await ctx.binding.query.user({ where: { id: userID } },
      `{
        funds(
          where: { donations_none: { chargeBalance: 0 } }
          orderBy: createdAt_ASC
        ) {
          id
          amountNet
          chargeID
          donations(first: 1, orderBy: createdAt_DESC) {
            chargeBalance
          }
        }
      }`);

    // Async recursive donation processing, doesn't matter when the donations are actually processed
    const donate = (fundsIndex, amountLeft) => {
      // Grab information on the charge (funds)
      const { amountNet, chargeID, donations, id: sourceID } = funds[fundsIndex];
      // If there is already a donation from the funds, use that balance
      const fundsBalance = donations.length ? donations[0].chargeBalance : amountNet;
      // Make the transfer
      const process = (partitionedAmount, chargeBalance) => (
        // Process the transfer in Stripe
        ctx.utils.stripe.transfers.create({
          amount: partitionedAmount,
          currency: 'usd',
          destination: connectedAccountID,
          source_transaction: chargeID,
        }).then(({ id: transferID }) => (
          // Add the donation to Phenominal and link it to the transaction
          ctx.client.createTransfer({
            amount: partitionedAmount,
            chargeBalance,
            firstOfBatch: fundsIndex == 0,
            transferID,
            event: { connect: { id: eventID } },
            source: { connect: { id: sourceID } },
            transaction: { connect: { id: transactionID } },
          })
        ))
      );
      // The whole donation has not been completed
      if (amountLeft > fundsBalance) {
        // Process the donation with the rest of the current funds
        process(fundsBalance, 0);
        // Prepare the next partition of the donation
        donate(fundsIndex + 1, amountLeft - fundsBalance);
      } else {
        // Donation is complete, portion of the current funds have been used
        process(amountLeft, fundsBalance - amountLeft);
      }
    };

    // Start the donation process
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
      // Checks if a donation has been made to the charity in the past day, meaning a Loop would already exist
      const loopExists = await ctx.client.$exists.transfer({
        createdAt_gte: dateToday,
      }, {
        event: { id: eventID },
      }, {
        transaction: {
          user: { id: userID },
        },
      });
      // Grab the user's current Loop count
      let { count: loopCount } = await ctx.utils.loops.grabLoops({ username });
      // Bool for if a new Loop has been created
      let loopGained = false;
      // Check if the donation is Loop eligible
      if (!loopExists) {
        // Add a Loop
        loopCount += 1;
        // Add the Loop
        await ctx.client.createLoop({
          count: loopCount,
          event: { connect: { id: eventID } },
          user: { connect: { id: userID } },
        });
        // Loop gained
        loopGained = true;
      }
      // Necessary info to return to the client
      return { loopCount, loopGained };
    };

    // Update the Loops and grab the count
    const { loopCount, loopGained } = await updateLoops();

    // Add the loopCount Halo if needed
    ctx.utils.halos.checkCompletion(userID, username, 'loopCount', loopCount);

    // ====================
    // Dots
    // ====================

    // The Dot boost, based on Loop count
    const { boost } = ctx.utils.loopStage(loopCount);

    // The amount of Dots received for donating
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

    // Information that is used in the confirmation and response
    const transactionData = {
      amount,
      balance: newBalance,
      charityName,
      date,
      transactionID,
    };

    // Grab the user's preferences
    const { allowDonationEmails } = await ctx.client.user({ id: userID }).preferences();

    // Check to see if the user has donation confirmation emails enabled
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
