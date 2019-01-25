// ============================
// grabLoops({ username })
// ============================

const loopStage = require('./loopStage');

module.exports = (client) => {
  // Grab Loops
  const grabLoops = async ({ username }) => {
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
    // Grab the most recent row for the loop count
    const [loopCount] = await client
      .user({ username })
      .loops({
        first: 1,
        orderBy: 'createdAt_DESC',
        // Loop's createdAt must be today or yesterday
        where: { createdAt_gte: dateYesterday() },
      });
    // If the loop count does not exist default to 0
    const count = loopCount ? loopCount.count : 0;
    // Grab all of the stage information (contains count)
    const stage = loopStage(count);
    return stage;
  };
  // Export the function
  return { grabLoops };
};
