module.exports = async (parent, { username }, ctx) => {
  // Yesterday's date in ISO format
  const dateYesterday = () => {
    const date = new Date();
    // Set the current date back by one date
    date.setDate(date.getDate() - 1);
    // Remove hours, minutes, seconds, and ms from date
    date.setUTCHours(0, 0, 0, 0);
    // Convert to ISO string
    return date.toISOString();
  };

  // Grab the loop count
  const loopCount = await ctx.db.query.loops({
    first: 1,
    orderBy: 'createdAt_DESC',
    where: {
      user: {
        username,
      },
      // Loop's createdAt must be today or yesterday
      createdAt_gte: dateYesterday(),
    },
  }, '{ count }');

  // Loop exists return its count, otherwise return 0
  const count = loopCount[0] ? loopCount[0].count : 0;
  return { count };
};
