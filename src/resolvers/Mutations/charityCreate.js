const startCase = require('lodash/startCase');
const toLower = require('lodash/toLower');
const trim = require('lodash/trim');

module.exports = async (parent, { ein, email, name, representative, url }, ctx) => {
  try {
    await ctx.client.createCharity({
      ein: trim(ein),
      email: trim(email),
      name: startCase(name),
      representative: startCase(representative),
      website: toLower(url),
    });
  } catch (e) {
    // Charity EIN or email already exists
    throw new ctx.utils.errors.CharityAlreadyExists();
  }
};
