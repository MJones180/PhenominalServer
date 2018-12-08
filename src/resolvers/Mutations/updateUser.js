const capitalize = require('lodash/capitalize');

module.exports = async (parent, { email, nameFirst, nameLast, allowDonationEmails, securityToken }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Properties to update
  const data = {};

  // If data is passed in, update it
  if (email) data.email = email;
  if (nameFirst) data.nameFirst = capitalize(nameFirst);
  if (nameLast) data.nameLast = capitalize(nameLast);
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
