const capitalize = require('lodash/capitalize');
const toUpper = require('lodash/toUpper');

module.exports = async (parent, { provider, token }, ctx) => {
  // Grab the user's data from the provider
  const getProviderData = async () => (
    // Go from Async > Sync
    ctx.utils.wait((done) => {
      // Call the corresponding provider and end the promise once the data is retrieved
      ctx.utils.providers[provider](token, data => done(data));
    })
  );
  // Bool for if the user is new
  let isNewUser = false;
  // Grab the current user, create one if needed
  const getUser = async ({ email, nameFirst, nameLast, providerID }) => {
    // Query to see if the identity already exists
    const identity = await ctx.client.identity({ providerID }).user();
    // Return if the identity exists
    if (identity) return identity;
    // User does not already exist
    isNewUser = true;
    // Capitalized name
    const upperFirst = capitalize(nameFirst);
    const upperLast = capitalize(nameLast);
    // Generate a random username consiting of the user's first and last name with a three digit suffix
    const generateUsername = async () => {
      // Create a new username with a random 1-3 digit number appended as the suffix
      const username = upperFirst + upperLast + ctx.utils.rand(1, 999);
      // Check if the username already exists
      const usernameExists = await ctx.binding.exists.User({ username });
      // If it does, generate a new one
      if (usernameExists) return generateUsername();
      return username;
    };
    // Create a new user and each of the relations
    const user = await ctx.client.createUser({
      email,
      nameFirst: upperFirst,
      nameLast: upperLast,
      securityToken: ctx.utils.token.createSecurity(),
      username: await generateUsername(),
      identity: {
        create: {
          provider: toUpper(provider),
          providerID,
        },
      },
      preferences: {
        create: {},
      },
    });
    // Add the newUser Halo if needed
    ctx.utils.halos.checkCompletion(user.id, user.username, 'newUser');
    // Return the user's info
    return user;
  };

  // Grab the user's info
  const { email, id, nameFirst, nameLast, securityToken, username } = await getUser(await getProviderData());

  return {
    // Generate an authToken
    authToken: ctx.utils.token.generate({ userID: id, securityToken }),
    email,
    id,
    isNewUser,
    nameFirst,
    nameLast,
    username,
  };
};
