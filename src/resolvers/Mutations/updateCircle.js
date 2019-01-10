const trim = require('lodash/trim');

module.exports = async (parent, { id: circleID, description, open }, ctx) => {
  // Grab the user's id
  const { id: userID } = await ctx.currentUser();

  // Grab the Circle's owner
  const { id: circleOwnerID } = await ctx.client.circle({ id: circleID }).owner();

  // Ensure the user is trying to edit their own Circle
  if (circleOwnerID != userID) return;

  // Description is no more than 250 characters
  if (description && trim(description).length > 250) {
    throw new ctx.utils.errors.InvalidCircleData();
  }

  // Update the Circle's information
  await ctx.client.updateCircle({
    data: {
      description: trim(description),
      open,
    },
    where: {
      id: circleID,
    },
  });
};
