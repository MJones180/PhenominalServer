const request = require('request');

module.exports = async (parent, { code, state, token }, ctx) => {
  // Grab the EIN from the auth token
  const ein = await ctx.utils.currentAuthCharity(token);

  // Grab the charity's createdAt
  const { createdAt } = await ctx.client.charity({ ein });

  // Throw an error
  const fail = () => {
    throw new ctx.utils.errors.FailedAccountConnection();
  };

  // The state is the charity's creation date, otherwise CSRF attack
  if (createdAt != state) fail();

  // Stripe URL to use to complete account connection
  const url = 'https://connect.stripe.com/oauth/token';

  // Stripe secret and code to connect account
  const data = {
    client_secret: process.env.STRIPE_SECRET,
    code,
    grant_type: 'authorization_code',
  };

  // Wrapped in Promise so the request isn't finished until the charity is updated
  return ctx.utils.wait(async (done) => {
    // POST data to Stripe
    await request.post({ url, formData: data }, async (err, resp, data) => {
      if (err) {
        console.log('[Stripe] Account Connection Err: ', err);
        fail();
      } else {
        const { stripe_user_id } = JSON.parse(data);
        // Update the charity's info with the Stripe account
        await ctx.client.updateCharity({
          data: { connectedAccountID: stripe_user_id },
          where: { ein },
        });
        // End the script
        done();
      }
    });
  });
};
