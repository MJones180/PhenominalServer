module.exports = async (parent, { id: circleID, username, accept }, ctx) => {
  // Grab the user's id
  const { id: userID } = await ctx.currentUser();

  // Grab the Circle's owner
  const { id: circleOwnerID } = await ctx.client.circle({ id: circleID }).owner();

  // Ensure it is the owner handling the request
  if (circleOwnerID != userID) return;

  // Delete the join request
  await ctx.client.deleteManyCircleJoinRequests({
    circle: {
      id: circleID,
    },
    user: {
      username,
    },
  });

  // Add the user to the Circle
  if (accept) {
    await ctx.client.updateCircle({
      data: {
        members: {
          connect: {
            username,
          },
        },
      },
      where: { id: circleID },
    });
  }
};
