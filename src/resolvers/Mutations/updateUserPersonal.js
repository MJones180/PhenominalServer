const capitalize = require('lodash/capitalize');

module.exports = async (parent, { email, nameFirst, nameLast }, ctx) => {
  // Ensure a user token exists
  ctx.user();

  // Grab the user's id from currentUser because it also verifies the securityToken
  const { id } = await ctx.resolvers.Query.currentUser(parent, {}, ctx, '{ id }');

  // Update the user's info
  ctx.db.mutation.updateUser({
    data: {
      email,
      nameFirst: capitalize(nameFirst),
      nameLast: capitalize(nameLast),
    },
    where: {
      id,
    },
  });
};
