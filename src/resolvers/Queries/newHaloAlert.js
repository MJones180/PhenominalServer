module.exports = async (parent, params, ctx) => {
  // Current user info
  const { id } = await ctx.currentUser();
  // Grab all Halos created within the past minute
  const [halo] = await ctx.client
    .user({ id })
    // Grab any Halos created within the last 15 seconds (15sec = 15,000ms)
    .halos({ where: { createdAt_gt: new Date(Date.now() - 15000) } });
  // Bool for if a new Halo has been created
  return !!halo;
};
