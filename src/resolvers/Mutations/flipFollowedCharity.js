module.exports = async (parent, { ein, unfollow }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Default to following the charity
  let action = 'connect';

  // Unfollow the charity
  if (unfollow) action = 'disconnect';

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
