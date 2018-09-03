module.exports = async (parent, args, ctx, info) => {
  // Current user
  const { userID, securityToken } = ctx.user();
  const grabData = async () => {
    const user = await ctx.db.query.users({
      // Find the user basied on their id and securityToken
      where: {
        AND: [{
          id: userID,
        }, {
          securityToken,
        }],
      },
    }, info);
    // Return the user only if one was found
    if (user[0]) return () => user[0];
    // Throw an error otherwise
    return () => { throw new ctx.utils.errors.InvalidUser(); };
  };
  // Grab the data
  const data = await grabData();
  return data();
};
