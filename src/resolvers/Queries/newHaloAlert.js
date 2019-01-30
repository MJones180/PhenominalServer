module.exports = async (parent, params, ctx) => {
  // Current user info
  const { id } = await ctx.currentUser();
  // Grab all Halos created within the past minute
  const [halo] = await ctx.client
    .user({ id })
    .halos({ where: {
      // Grab any Halos created within the past 8 seconds (8sec = 8,000ms)
      createdAt_gt: new Date(Date.now() - 8000),
      // Do not listen for the newUser Halo
      key_not: 'newUser',
    } });
  // Bool for if a new Halo has been created
  return !!halo;
};
