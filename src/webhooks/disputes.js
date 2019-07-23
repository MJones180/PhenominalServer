const wrapper = require('./wrapper');

module.exports = (email, stripe) => (
  wrapper(email, stripe, process.env.WEBHOOK_DISPUTES, {
    'charge.dispute.closed': data => data,
    'charge.dispute.created': data => data,
    'charge.dispute.funds_reinstated': data => data,
    'charge.dispute.funds_withdrawn': data => data,
    'charge.dispute.updated': data => data,
  })
);
