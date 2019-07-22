const bodyParser = require('body-parser');

module.exports = (stripe, secret, events) => ([
  bodyParser.raw({ type: 'application/json' }),
  (req, resp) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, secret);
    } catch (err) {
      resp.status(400).send(`Webhook Error: ${err.message}`);
    }

    const { type, data: { object: data } } = event;

    if (events[type]) {
      console.log('Type: ', type);
      events[type](data);
    } else return resp.status(400).end();

    // Return a response to acknowledge receipt of the event
    resp.json({ received: true });
  },
]);
