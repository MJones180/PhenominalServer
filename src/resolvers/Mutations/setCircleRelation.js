module.exports = async (parent, { id: circleID, leave }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Join/leave a Circle
  const setRelation = async action => (
    ctx.client.updateUser({
      data: {
        circles: {
          [action]: {
            id: circleID,
          },
        },
      },
      where: { id },
    })
  );

  // Create a request to join the Circle
  const createJoinRequest = async () => (
    ctx.client.createCircleJoinRequest({
      circle: {
        connect: {
          id: circleID,
        },
      },
      user: {
        connect: {
          id,
        },
      },
    })
  );

  // Leave the circle
  if (leave) {
    await setRelation('disconnect');
    return 'LEAVE';
  }
  // Check if the Circle is open
  const { open } = await ctx.client.circle({ id: circleID });
  // Join the Circle
  if (open) {
    await setRelation('connect');
    return 'JOIN';
  }
  // Send a request to join
  await createJoinRequest();
  return 'PENDING';
};
