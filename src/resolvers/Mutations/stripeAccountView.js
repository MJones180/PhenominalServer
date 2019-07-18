const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Set the API version
stripe.setApiVersion('2019-03-14');

module.exports = async (parent, { token }, ctx) => {
  // Grab the EIN from the auth token
  const ein = await ctx.utils.currentAuthCharity(token);

  // Grab the charity's connectedAccountID
  const { connectedAccountID } = await ctx.client.charity({ ein });

  return ctx.utils.wait(async (done) => {
    // Grab the one-time link to view the charity's Stripe dashboard
    stripe.accounts.createLoginLink(
      connectedAccountID,
      (err, link) => done(link.url)
    );
  });
};
