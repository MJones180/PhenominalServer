const validator = require('email-validator');

module.exports = async (parent, { email, message }, ctx) => {
  // Grab the user's information
  const { nameFirst, nameLast } = await ctx.currentUser();
  // Ensure a valid email is passed
  if (!validator.validate(email)) return;
  // Send the invite email
  ctx.utils.email.friendInvite(email, message, nameFirst, nameLast);
};
