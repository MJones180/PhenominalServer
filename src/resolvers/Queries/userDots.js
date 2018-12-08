module.exports = async (parent, { username }, ctx) => {
  // Grab the most recent row for the dot total
  const [dotCount] = await ctx.client
    .user({ username })
    .dots({
      first: 1,
      orderBy: 'createdAt_DESC',
    });
  // If the dot total does not exist default to 0
  const total = dotCount ? dotCount.total : 0;
  return total;
};
