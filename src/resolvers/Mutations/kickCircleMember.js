module.exports = async (parent, { id: circleID, username }, ctx) => {
  // Grab the user's id
  const { id: userID } = await ctx.currentUser();

  // Grab the Circle's owner
  const { id: circleOwnerID, username: circleOwnerUsername } = await ctx.client.circle({ id: circleID }).owner();

  // Ensure it is the owner trying to kick a member
  if (circleOwnerID != userID) return;

  // Ensure the owner is not trying to leave
  if (circleOwnerUsername == username) return;

  // Kick the member
  await ctx.client.updateCircle({
    data: {
      members: {
        disconnect: {
          username,
        },
      },
    },
    where: { id: circleID },
  });
};
