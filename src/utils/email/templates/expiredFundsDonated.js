const sendEmail = require('../sendEmail');

module.exports = ({ amount, balance, charityName, transactionID }, email, nameFirst, nameLast) => (
  sendEmail({
    email,
    name: `${nameFirst} ${nameLast}`,
    template: 932564,
    variables: {
      amount: amount / 100,
      balance: balance / 100,
      charityName,
      firstname: nameFirst,
      transactionID,
    },
  })
);
