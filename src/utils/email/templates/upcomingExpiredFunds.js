const moment = require('moment');
const sendEmail = require('../sendEmail');

module.exports = ({ amount, expirationDate }, email, nameFirst, nameLast) => (
  sendEmail({
    email,
    name: `${nameFirst} ${nameLast}`,
    template: 945047,
    variables: {
      amount: amount / 100,
      firstname: nameFirst,
      expirationDate: moment(expirationDate).format('MM/DD/YYYY'),
    },
  })
);
