module.exports = async (parent, args, ctx) => {
  // Grab the user
  const user = await ctx.currentUser();
  // Grab the balance
  return user.grabBalance();
};
