const capitalize = require('lodash/capitalize');

module.exports = async (parent, { email, nameFirst, nameLast }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();
  // Update the user's info
  return ctx.client.updateUser({
    data: {
      email,
      nameFirst: capitalize(nameFirst),
      nameLast: capitalize(nameLast),
    },
    where: {
      id,
    },
  });
};
