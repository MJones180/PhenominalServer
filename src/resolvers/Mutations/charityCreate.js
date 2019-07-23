const startCase = require('lodash/startCase');
const toLower = require('lodash/toLower');
const trim = require('lodash/trim');

module.exports = async (parent, { ein, email, name, representative, url }, ctx) => {
  try {
    const data = {
      ein: trim(ein),
      email: trim(email),
      name: startCase(name),
      representative: startCase(representative),
      website: toLower(url),
    };
    await ctx.client.createCharity(data);
    await ctx.utils.email.charityCreated(data);
  } catch (e) {
    // Charity EIN or email already exists
    throw new ctx.utils.errors.CharityAlreadyExists();
  }
};
