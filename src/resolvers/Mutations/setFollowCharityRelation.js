module.exports = async (parent, { ein, unfollow }, ctx) => {
  // Grab the user's info
  const { id, username } = await ctx.currentUser();

  // Default to following the charity
  let action = 'connect';

  // Unfollow the charity
  if (unfollow) action = 'disconnect';
  // Actions for when connecting a new charity
  else {
    // Grab the user's followed charities
    const charities = await ctx.client.user({ id }).followedCharities();
    // Add the followCharity Halo if needed
    ctx.utils.halos.checkCompletion(id, username, 'followCharity', charities.length + 1);
    // Grab the charity's name
    const { name } = await ctx.client.charity({ ein });
    // Add to the Feed
    await ctx.client.createFeed({
      link: ein,
      message: name,
      type: 'CHARITY_FOLLOWED',
      user: {
        connect: { id },
      },
    });
  }

  // Follow/Unfollow the requested charity
  await ctx.client.updateUser({
    data: {
      followedCharities: {
        [action]: {
          ein,
        },
      },
    },
    where: {
      id,
    },
  });
};
