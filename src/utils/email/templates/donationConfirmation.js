const map = require('lodash/map');
const sendEmail = require('../sendEmail');

module.exports = ({ transactionsData, user }) => {
  const { amount, balances, events, ids } = transactionsData;
  const { email, nameFirst, nameLast } = user;
  // Format the data for the mailjet template
  const donationData = map(ids, (id, index) => ({
    id,
    amount: amount / 100,
    balance: balances[index] / 100,
    event: events[index],
    currentIteration: index + 1,
  }));
  sendEmail({
    email,
    name: `${nameFirst} ${nameLast}`,
    template: 308059,
    variables: {
      donations: donationData,
      donationCount: donationData.length,
      firstname: nameFirst,
    },
  });
};
