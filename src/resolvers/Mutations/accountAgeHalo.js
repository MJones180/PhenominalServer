module.exports = async (parent, params, ctx) => {
  // Current user info
  const { createdAt, id, username } = await ctx.currentUser();

  // MS   * SEC * MIN * HOUR = DAY
  // 1000 * 60  * 60  * 24   = 86400000
  const DAY = 86400000;

  // Subtract the createdAt from the current date and divide by one day
  const days = (new Date()) - (new Date(createdAt)) / DAY;

  // Check if the user has completed the accountAge Halo
  ctx.utils.halos.checkCompletion(id, username, 'accountAge', days);
};
