const { CronJob } = require('cron');
const each = require('lodash/each');

module.exports = (binding, client, sendEmail, grabEvents, stripe) => {
  const handleExpiredFunds = async () => {
    const [{ id: eventID, charity: { connectedAccountID, name: charityName } }] = await grabEvents.current({ first: 1 }, '{ id charity { connectedAccountID name} }');

    const date80DaysAgo = () => {
      const date = new Date();
      // Set the current date back by 80 days
      date.setDate(date.getDate() - 80);
      // Convert to ISO string
      return date.toISOString();
    };

    const charges = await binding.query.charges({
      where: {
        createdAt_lte: date80DaysAgo(),
        donations_every: { chargeBalance_gt: 0 },
      },
    }, `{
      id
      amountNet
      chargeID
      donations(first: 1) {
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

    each(charges, async ({ amountNet, chargeID, donations, id: sourceID, user: { id: userID, email, nameFirst, nameLast, tranasctions } }) => {
      const chargeBalance = donations.length ? donations[0].chargeBalance : amountNet;
      const [{ balance }] = tranasctions;

      const newBalance = balance - chargeBalance;

      // Create the transaction that links to the donations
      const createTransaction = async () => (
        client.createTransaction({
          balance: newBalance,
          user: { connect: { id: userID } },
        })
      );

      // Grab the date and transaction's ID for the confirmation and linking the donations
      const { createdAt: date, id: transactionID } = await createTransaction();

      const amount = donations.length ? donations[0].chargeBalance : amountNet;
      stripe.transfers.create({
        amount,
        currency: 'usd',
        destination: connectedAccountID,
        source_transaction: chargeID,
      }).then(({ id: transferID }) => (
      // Add the donation to Phenominal and link it to the transaction
        client.createTransfer({
          amount,
          chargeBalance,
          firstOfBatch: true,
          transferID,
          event: { connect: { id: eventID } },
          source: { connect: { id: sourceID } },
          transaction: { connect: { id: transactionID } },
        })
      ));

      // Information that is used in the confirmation and response
      const transactionData = {
        amount,
        balance: newBalance,
        charityName,
        date,
        transactionID,
      };

      sendEmail.donationConfirmation(transactionData, email, nameFirst, nameLast);
    });
  };

  new CronJob('00 00 00 * * *', handleExpiredFunds()).start();
};
