const _ = require('lodash');
const localtunnel = require('localtunnel');
const stripe = require('./src/utils/stripe');

// Make the local server (localhost:4000) publicly accessible
localtunnel(4000, (err, { url }) => {
  if (err) console.log(err);

  console.log(`Running on ${url}`);

  // All dev webhooks
  const webhooks = {
    'webhook/disputes': 'we_1Exlx1F0S6xPuZyAcXMWTPkm',
    'webhook/connect': 'we_1EzCjhF0S6xPuZyAmYVsQ7j1',
  };

  // Update the webhook's endpoint
  const updateEndpoint = (webhook, name) => {
    stripe.webhookEndpoints.update(webhook, { url: `${url}/${name}` },
      (err, { url }) => {
        if (err) console.log(err);
        console.log(`[Updated] ${name}: ${url}`);
      });
  };

  // Loop through each of the webhooks
  _.each(webhooks, (webhook, name) => updateEndpoint(webhook, name));
});
