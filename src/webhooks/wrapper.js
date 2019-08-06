const bodyParser = require('body-parser');

module.exports = (email, stripe, secret, events) => ([
  bodyParser.raw({
    type: 'application/json',
    verify: (req, res, buf) => {
      const url = req.originalUrl;
      if (url.startsWith('/stripe-webhooks')) {
        req.rawBody = buf.toString();
      }
    },
  }),
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
      email.webhookAlert({
        type,
        value: JSON.stringify(events[type](data), null, 2),
      });
    } else return resp.status(400).end();

    resp.json({ received: true });
  },
]);
