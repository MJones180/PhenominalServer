module.exports = async (parent, { id: circleID, username }, ctx) => {
  // Grab the user's id
  const { id: userID } = await ctx.currentUser();

  // Grab the Circle's owner
  const { id: circleOwnerID, username: circleOwnerUsername } = await ctx.client.circle({ id: circleID }).owner();

  // Ensure it is the owner trying to invite someone
  if (circleOwnerID != userID) return;

  // Ensure the owner is not trying to invite themself
  if (circleOwnerUsername == username) return;

  // Send the invite
  await ctx.client.createCircleInvite({
    circle: {
      connect: {
        id: circleID,
      },
    },
    user: {
      connect: {
        username,
      },
    },
  });
};
