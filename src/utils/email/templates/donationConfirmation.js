const map = require('lodash/map');
const sendEmail = require('../sendEmail');

module.exports = ({ amount, transactions, user: { email, nameFirst, nameLast } }) => {
  // Format the data for the mailjet template
  const donationData = map(transactions, ({ balance, event, id }, index) => ({
    id,
    amount: amount / 100,
    balance: balance / 100,
    event,
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
