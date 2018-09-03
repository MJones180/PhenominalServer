const sendEmail = require('../sendEmail');

module.exports = ({ transactionData, userData }) => {
  const { amountCharged, amountReceived, balance, email } = transactionData;
  const { nameFirst, nameLast } = userData;
  sendEmail({
    email,
    name: `${nameFirst} ${nameLast}`,
    template: 314246,
    variables: {
      ...transactionData,
      amountCharged: amountCharged / 100,
      amountReceived: amountReceived / 100,
      balance: balance / 100,
      firstname: nameFirst,
    },
  });
};
