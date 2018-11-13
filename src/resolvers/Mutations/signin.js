const capitalize = require('lodash/capitalize');
const toUpper = require('lodash/toUpper');

module.exports = async (parent, { provider, token }, ctx) => {
  // Grab the user's data from the provider
  const getProviderData = async () => (
    // Create a promise to wait for the data to be fetched
    new Promise((cb) => {
      // Call the corresponding provider and end the promise once the data is retrieved
      ctx.utils.providers[provider](token, data => cb(data));
      // Return the user's data
    }).then(data => data)
  );

  // Grab the current user, create one if needed
  const getUser = async ({ email, nameFirst, nameLast, providerID }) => {
    // Query to see if the identity already exists
    const identity = await ctx.db.query.identity({ where: { providerID } }, '{ user { id securityToken } }');
    // Return if the identity exists
    if (identity) return identity.user;
    // Create a new user
    // Must also create each of the relations
    return ctx.db.mutation.createUser({
      data: {
        email,
        nameFirst: capitalize(nameFirst),
        nameLast: capitalize(nameLast),
        securityToken: ctx.utils.token.generateSecurity(),
        username: capitalize(nameFirst) + capitalize(nameLast) + Math.floor(Math.random() * (999 - 1) + 1),
        identity: {
          create: {
            provider: toUpper(provider),
            providerID,
          },
        },
        preferences: {
          create: {},
        },
      },
    }, '{ email id nameFirst nameLast securityToken username }');
  };

  // Grab the user's info
  const { email, id, nameFirst, nameLast, securityToken, username } = await getUser(await getProviderData());

  return {
    // Generate an authToken
    authToken: ctx.utils.token.generateAuth({ userID: id, securityToken }),
    email,
    id,
    nameFirst,
    nameLast,
    username,
  };
};
