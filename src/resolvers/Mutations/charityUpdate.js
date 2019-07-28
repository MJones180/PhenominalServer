const validator = require('email-validator');
const each = require('lodash/each');
const isString = require('lodash/isString');
const isUndefined = require('lodash/isUndefined');
const startCase = require('lodash/startCase');
const toLower = require('lodash/toLower');
const toUpper = require('lodash/toUpper');
const trim = require('lodash/trim');

module.exports = async (parent, { token, ...params }, ctx) => {
  // Grab the EIN from the auth token
  const ein = await ctx.utils.currentAuthCharity(token);

  // Properties to update
  const data = {};

  // Throw an error
  const invalidData = () => {
    throw new ctx.utils.errors.InvalidCharityData();
  };

  // Fields that can be updated
  const fields = [
    ['acronym', val => toUpper(val)],
    ['bannerCredit', val => startCase(toLower(val))],
    ['email'],
    ['expensesAdministrative'],
    ['expensesFundraising'],
    ['expensesOther'],
    ['expensesProgram'],
    ['expensesUpdated'],
    ['location'],
    ['mission'],
    ['name', val => startCase(toLower(val))],
    ['phoneNumber'],
    ['representative', val => startCase(toLower(val))],
    ['website', val => toLower(val)],
  ];

  // Update the fields
  each(fields, ([field, format]) => {
    // Field's value
    let fieldValue = params[field];
    // Field was passed for update
    if (!isUndefined(fieldValue)) {
      // Trim all strings
      if (isString(fieldValue)) fieldValue = trim(fieldValue);
      // Format the field and update it
      data[field] = format ? format(fieldValue) : fieldValue;
    }
  });

  // Ensure the email is valid and none of the required fields are being reset
  if ((data.email && !validator.validate(data.email)) || data.name == '' || data.representative == '' || data.website == '') invalidData();

  // Grab the pictures and check if they are being updated
  const { banner, logo } = params;
  const bannerUpdated = banner && !isString(banner);
  const logoUpdated = logo && !isString(logo);

  if (bannerUpdated || logoUpdated) {
    // Grab the old banner/logo path
    const { id, banner: oldBanner, logo: oldLogo } = await ctx.client.charity({ ein });
    // Update the picture's key in the db
    const updateKey = picture => (newKey) => { data[picture] = newKey; };
    // Upload the new banner
    if (bannerUpdated) await ctx.utils.uploadPicture(banner, id, 'charities/banners', updateKey('banner'), oldBanner);
    // Upload the new logo
    if (logoUpdated) await ctx.utils.uploadPicture(logo, id, 'charities/logos', updateKey('logo'), oldLogo);
  }

  // Update the charity information
  await ctx.client.updateCharity({
    data,
    where: {
      ein,
    },
  });
};
