// ============================
// addDots({ action, amount, username })
// grabDots({ username })
// ============================

module.exports = (client) => {
  // Grab Dots
  const grabDots = async ({ username }) => {
    // Grab the most recent row for the dot total
    const [dotCount] = await client
      .user({ username })
      .dots({
        first: 1,
        orderBy: 'createdAt_DESC',
      });
    // If the dot total does not exist default to 0
    const total = dotCount ? dotCount.total : 0;
    return total;
  };
  // Add Dots
  const addDots = async ({ action, amount, username }) => {
    // Grab the user's current Dot total
    const dotCount = await grabDots({ username });
    const total = dotCount + amount;
    // Add Dots
    await client.createDot({
      action,
      amount,
      total,
      user: { connect: { username } },
    });
    return total;
  };
  // Export the functions
  return { addDots, grabDots };
};
