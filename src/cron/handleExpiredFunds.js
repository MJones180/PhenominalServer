// =============================
// Cron to auto donate funds
// over 80 days old
// =============================

const { CronJob } = require('cron');
const moment = require('moment');
const each = require('lodash/each');

module.exports = (binding, client, sendEmail, grabEvents, stripe) => {
  const handleExpiredFunds = async () => {
    // Format console logs
    const log = text => console.log(`[Cron] ${text}`);
    // Alert that the process has started
    log(new Date().toISOString());
    log('Executing handleExpiredFunds');
    // The date constraint for the charges
    const date80DaysAgo = () => moment().subtract(80, 'days').toISOString();
    // Grab all of the charges that need to be donated
    const charges = await binding.query.charges({
      where: {
        createdAt_lte: date80DaysAgo(),
        donations_every: { chargeBalance_gt: 0 },
      },
    }, `{
      id
      amountNet
      chargeID
      donations(first: 1, orderBy: createdAt_DESC) {
        chargeBalance
      }
      user {
        id
        email
        nameFirst
        nameLast
        transactions(first: 1, orderBy: createdAt_DESC) {
          balance
        }
      }
    }`);
    // There is at least one charge that needs to be auto donated
    if (charges.length) {
      // Grab the current event info
      const activeEvent = await grabEvents.current({ first: 1 }, '{ id charity { connectedAccountID name} }');
      if (activeEvent) {
        const [{ id: eventID, charity: { connectedAccountID, name: charityName } }] = activeEvent;
        log('Charges:');
        // Donate each of the charges
        each(charges, async ({ amountNet, chargeID, donations, id: sourceID, user: { id: userID, email, nameFirst, nameLast, transactions } }) => {
          // Log the charge's ID
          log(`- ${sourceID}`);
          // User's current balance
          const [{ balance }] = transactions;
          // Amount of the source funds left
          const amount = donations.length ? donations[0].chargeBalance : amountNet;
          // Balance after donating
          const newBalance = balance - amount;
          // Create the transaction that links to the donation
          const { createdAt: date, id: transactionID } = await client.createTransaction({
            balance: newBalance,
            user: { connect: { id: userID } },
          });
          // Transfer the funds in Stripe
          stripe.transfers.create({
            amount,
            currency: 'usd',
            destination: connectedAccountID,
            source_transaction: chargeID,
          }).then(({ id: transferID }) => (
            // Add the donation to Phenominal and link it to the transaction
            client.createTransfer({
              amount,
              chargeBalance: 0,
              firstOfBatch: true,
              transferID,
              event: { connect: { id: eventID } },
              source: { connect: { id: sourceID } },
              transaction: { connect: { id: transactionID } },
            })
          ));
          // Information that is used in the confirmation
          const transactionData = {
            amount,
            balance: newBalance,
            charityName,
            date,
            transactionID,
          };
          // Send an email that the funds where automatically donated
          sendEmail.expiredFundsDonated(transactionData, email, nameFirst, nameLast);
        });
      } else log('No Active Event');
    } else log('No Charges');
  };
  // Run script at 12:05AM everyday
  new CronJob('00 05 00 * * *', handleExpiredFunds).start();
};
