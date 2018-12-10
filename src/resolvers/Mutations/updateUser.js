const capitalize = require('lodash/capitalize');
const trim = require('lodash/trim');

module.exports = async (parent, { email, nameFirst, nameLast, username, allowDonationEmails, securityToken }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Properties to update
  const data = {};

  // If fields are passed, simply update them
  if (email) data.email = email;
  if (nameFirst) data.nameFirst = capitalize(nameFirst);
  if (nameLast) data.nameLast = capitalize(nameLast);

  // If username is passed, make sure it does not already exist
  if (username) {
    // Ensure the username does not already exist for another user
    const usernameExists = await ctx.binding.exists.User({ username: trim(username), id_not: id });
    // If it does throw an error
    if (usernameExists) throw new ctx.utils.errors.UsernameAlreadyExists();
    // Update username
    data.username = trim(username);
  }

  // Update nested preference field if bool is set
  if (allowDonationEmails != undefined) data.preferences = { update: { allowDonationEmails } };

  // Generate a new securityToken if bool is true
  if (securityToken) data.securityToken = ctx.utils.token.generateSecurity();

  // Update the user's info
  return ctx.client.updateUser({
    data,
    where: {
      id,
    },
  });
};
