const sendEmail = require('../sendEmail');

module.exports = (email, message, nameFirst, nameLast) => {
  sendEmail({
    email,
    name: 'Phenominal Invite',
    template: 689362,
    variables: {
      message,
      nameFirst,
      nameLast,
    },
  });
};
