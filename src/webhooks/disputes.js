const wrapper = require('./wrapper');

module.exports = stripe => (
  wrapper(stripe, process.env.WEBHOOK_DISPUTES, {
    'charge.dispute.closed': data => console.log(data),
    'charge.dispute.created': data => console.log(data),
    'charge.dispute.funds_reinstated': data => console.log(data),
    'charge.dispute.funds_withdrawn': data => console.log(data),
    'charge.dispute.updated': data => console.log(data),
  })
);
