const wrapper = require('./wrapper');

module.exports = (email, stripe) => (
  wrapper(email, stripe, process.env.WEBHOOK_CONNECT, {
    'account.updated': ({ id, livemode, requirements }) => ({ id, livemode, requirements }),
  })
);
