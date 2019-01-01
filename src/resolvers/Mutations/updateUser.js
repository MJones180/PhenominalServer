const capitalize = require('lodash/capitalize');
const trim = require('lodash/trim');
const mapValues = require('lodash/mapValues');
const set = require('lodash/set');
const validator = require('email-validator');

module.exports = async (parent, params, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();

  // Simple params
  const { allowDonationEmails, publicProfile, securityToken } = params;

  // Trimmed params
  const { bio, email, nameFirst, nameLast, username } = mapValues(params, param => trim(param));

  // Properties to update
  const data = {};

  // Throw an error if any of the data is invalid
  const invalidData = () => {
    throw new ctx.utils.errors.InvalidUserData();
  };

  // Check if bio is passed
  if (bio) {
    // Ensure it is no more than 250 characters
    if (bio.length <= 250) data.bio = bio;
    else invalidData();
  }

  // Check if email is passed
  if (email) {
    // Ensure it is valid
    if (validator.validate(email)) data.email = email;
    else invalidData();
  }

  // Check if first name is passed
  if (nameFirst) {
    // Ensure it is no more than 30 characters
    if (nameFirst.length <= 30) data.nameFirst = capitalize(nameFirst);
    else invalidData();
  }

  // Check if last name is passed
  if (nameLast) {
    // Ensure it is no more than 30 characters
    if (nameLast.length <= 30) data.nameLast = capitalize(nameLast);
    else invalidData();
  }

  // Check if username is passed
  if (username) {
    // Ensure the username does not already exist for another user
    const usernameExists = await ctx.binding.exists.User({ username, id_not: id });
    // If it already exists throw an error
    if (usernameExists) throw new ctx.utils.errors.UsernameAlreadyExists();
    // Check if username is between 5 and 30 characters
    const length = username.length >= 5 && username.length <= 30;
    // Check if username contains invalid characters
    const valid = /^[a-zA-Z0-9_]+$/.test(username);
    // Update username if all checks are passed
    if (length && valid) data.username = username;
    else invalidData();
  }

  // Update nested preference fields if bools are set
  if (allowDonationEmails != undefined) set(data, 'preferences.update.allowDonationEmails', allowDonationEmails);
  if (publicProfile != undefined) set(data, 'preferences.update.publicProfile', publicProfile);

  // Generate a new securityToken if bool is set
  if (securityToken) data.securityToken = ctx.utils.token.generateSecurity();

  // Update the user's info
  await ctx.client.updateUser({
    data,
    where: {
      id,
    },
  });
};
