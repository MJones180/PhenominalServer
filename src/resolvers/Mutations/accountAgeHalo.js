module.exports = async (parent, params, ctx) => {
  // Current user info
  const { createdAt, id, username } = await ctx.currentUser();

  // MS   * SEC * MIN * HOUR = DAY
  // 1000 * 60  * 60  * 24   = 86400000
  const DAY = 86400000;

  // Grab the amount of time since account creation
  const timeAgo = (new Date()) - (new Date(createdAt));

  // Convert the time to days
  const days = timeAgo / DAY;

  // Add the accountAge Halo if needed
  ctx.utils.halos.checkCompletion(id, username, 'accountAge', days);
};
