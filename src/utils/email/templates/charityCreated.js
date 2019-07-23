const sendEmail = require('../sendEmail');

module.exports = (variables) => {
  sendEmail({
    email: 'team@phenominal.fund',
    name: 'Charity Created',
    template: 922933,
    variables,
  });
};
