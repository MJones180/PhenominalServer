module.exports = async (parent, args, ctx) => {
  // Ensure a user token exists
  ctx.user();
  const resultData = `
    {
      id
      transactions(
        orderBy: createdAt_DESC
        first: 1
      ) {
        balance
      }
    }
  `;
  // Query the current user
  const { id, transactions } = await ctx.resolvers.Query.currentUser(parent, {}, ctx, resultData);
  // If there is a balance, return it
  const balance = transactions[0] ? transactions[0].balance : 0;
  return {
    userID: id,
    balance,
  };
};
