module.exports = async (parent, args, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();
  // Update the user's security token
  return ctx.client.updateUser({
    data: {
      securityToken: ctx.utils.token.generateSecurity(),
    },
    where: {
      id,
    },
  });
};
