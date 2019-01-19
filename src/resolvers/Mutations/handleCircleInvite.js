module.exports = async (parent, { id: circleID, join }, ctx) => {
  // Grab the user's id
  const { id: userID } = await ctx.currentUser();

  // Delete the invite request
  await ctx.client.deleteManyCircleInvites({
    circle: {
      id: circleID,
    },
    user: {
      id: userID,
    },
  });

  // Add the user to the Circle
  if (join) {
    await ctx.client.updateCircle({
      data: {
        members: {
          connect: {
            id: userID,
          },
        },
      },
      where: { id: circleID },
    });
  }
};
