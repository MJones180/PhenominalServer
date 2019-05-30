module.exports = async (parent, args, ctx) => {
  // Grab the user
  const { grabBalance } = await ctx.currentUser();
  // Grab the balance
  return grabBalance();
};
