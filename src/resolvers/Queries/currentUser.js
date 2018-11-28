module.exports = async (parent, args, ctx) => {
  // Current user
  const { userID, securityToken } = ctx.user();
  const user = await ctx.prismaClient.user({ id: userID });
  if (user && (user.securityToken == securityToken)) return user;
  throw new ctx.utils.errors.InvalidUser();
};
