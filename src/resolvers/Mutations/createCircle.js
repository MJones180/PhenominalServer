const trim = require('lodash/trim');
const mapValues = require('lodash/mapValues');

module.exports = async (parent, params, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Grab the user's owned Circles
  const circles = await ctx.client.user({ id }).circlesOwned();

  // Ensure the user does not already have 3 Circles
  if (circles.length >= 3) return;

  // Trim each of the string valued params
  const { description, name } = mapValues(params, param => trim(param));
  // Simple params
  const { open } = params;

  // Ensure the name exists and is no more than 30 characters
  // Description is optional, but no more than 250 characters
  if (!name || name.length > 30 || (description && description.length > 250)) {
    throw new ctx.utils.errors.InvalidCircleData();
  }

  // Check if the Circle name already exists
  const exists = await ctx.client.circle({ name });
  // Throw an error if it does, must be unique
  if (exists) throw new ctx.utils.errors.CircleNameExists();

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
