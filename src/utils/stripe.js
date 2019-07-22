const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Set the API version
stripe.setApiVersion('2019-03-14');

module.exports = stripe;
