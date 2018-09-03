const sendEmail = require('../sendEmail');

module.exports = (variables) => {
  sendEmail({
    email: 'support@phenominal.fund',
    name: 'Contact Message',
    template: 497325,
    variables,
  });
};
