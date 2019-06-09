const moment = require('moment');
const sendEmail = require('../sendEmail');

module.exports = ({ amountCharged, amountReceived, balance, expiration, transactionID }, email, nameFirst, nameLast) => (
  sendEmail({
    email,
    name: `${nameFirst} ${nameLast}`,
    template: 314246,
    variables: {
      amountCharged: amountCharged / 100,
      amountReceived: amountReceived / 100,
      balance: balance / 100,
      expiration: moment(expiration).format('MM/DD/YYYY'),
      firstname: nameFirst,
      transactionID,
    },
  })
);
