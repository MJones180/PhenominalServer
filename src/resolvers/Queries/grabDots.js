module.exports = async (parent, { username }, ctx) => {
  // Grab the dot total
  const dotCount = await ctx.db.query.dots({
    first: 1,
    orderBy: 'createdAt_DESC',
    where: {
      user: {
        username,
      },
    },
  }, '{ total }');

  // Dot exists return its total, otherwise return 0
  const total = dotCount[0] ? dotCount[0].total : 0;
  return { total };
};
