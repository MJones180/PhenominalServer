const trim = require('lodash/trim');

module.exports = async (parent, params, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Grab the user's owned Circles
  const circles = await ctx.client.user({ id }).circlesOwned();

  // Ensure the user does not already have 3 Circles
  if (circles.length > 3) return;

  let { description, name } = params;
  const { open } = params;

  // Throw an error if any of the data is invalid
  const invalidData = () => {
    throw new ctx.utils.errors.InvalidCircleData();
  };

  description = trim(description);
  // Ensure it is no more than 250 characters
  if (description && description.length > 250) invalidData();

  name = trim(name);
  // Ensure the name is passed and it is no more than 30 characters
  if (!name || name.length > 30) invalidData();

  // Create the Circle
  const { id: circleID } = await ctx.client.createCircle({
    description,
    name,
    open,
    owner: {
      connect: { id },
    },
    users: {
      connect: { id },
    },
  });

  // Return the Circle's ID
  return circleID;
};
