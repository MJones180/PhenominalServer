const sendEmail = require('../sendEmail');

module.exports = (variables) => {
  sendEmail({
    email: 'support@phenominal.fund',
    name: 'Charity Suggestion',
    template: 366950,
    variables,
  });
};
