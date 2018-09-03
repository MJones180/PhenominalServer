module.exports = async (parent, args, ctx) => {
  // Ensure a user token exists
  ctx.user();

  // Grab the user's id from currentUser because it also verifies the securityToken
  const { id } = await ctx.resolvers.Query.currentUser(parent, {}, ctx, '{ id }');

  // Update the user's security token
  ctx.db.mutation.updateUser({
    data: {
      securityToken: ctx.utils.token.generateSecurity(),
    },
    where: {
      id,
    },
  });
};
