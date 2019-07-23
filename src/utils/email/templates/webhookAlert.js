const sendEmail = require('../sendEmail');

module.exports = (variables) => {
  sendEmail({
    email: 'team@phenominal.fund',
    name: 'Webhook Alert',
    template: 922917,
    variables,
  });
};
