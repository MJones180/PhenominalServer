const sendEmail = require('../sendEmail');

module.exports = ({ authLink, charity, email, representative }) => (
  sendEmail({
    email,
    name: `${representative}`,
    template: 880082,
    variables: {
      authLink,
      charity,
      representative,
    },
  })
);
