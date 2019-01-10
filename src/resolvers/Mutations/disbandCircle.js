module.exports = async (parent, { id: circleID }, ctx) => {
  // Grab the user's id
  const { id: userID } = await ctx.currentUser();

  // Grab the Circle's owner
  const { id: circleOwnerID } = await ctx.client.circle({ id: circleID }).owner();

  // Ensure the user is trying to disband their own Circle
  if (circleOwnerID != userID) return;

  // Delete the Circle
  await ctx.client.deleteCircle({ id: circleID });
};
