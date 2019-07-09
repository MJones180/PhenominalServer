const validator = require('email-validator');
const mapValues = require('lodash/mapValues');
const startCase = require('lodash/startCase');
const toLower = require('lodash/toLower');
const toUpper = require('lodash/toUpper');
const trim = require('lodash/trim');

module.exports = async (parent, { token, ...params }, ctx) => {
  // Grab the EIN from the auth token
  const ein = await ctx.utils.currentAuthCharity(token);

  // Trimmed params
  const { acronym, bannerCredit, email, location, mission, name, representative, website } = mapValues(params, param => (param ? trim(param) : param));

  // Regular params
  const { banner, expensesAdministrative, expensesFundraising, expensesOther, expensesProgram, expensesUpdated, logo, phoneNumber } = params;

  // Properties to update
  const data = {};

  // Throw an error
  const invalidData = () => {
    throw new ctx.utils.errors.InvalidCharityData();
  };

  // Ensure none of the required fields are being reset
  if (email == '' || name == '' || representative == '' || website == '') invalidData();

  // ==================================
  // Update each field if it was passed
  // ==================================
  if (acronym) data.acronym = toUpper(acronym);
  if (bannerCredit) data.bannerCredit = startCase(toLower(bannerCredit));
  if (expensesAdministrative) data.expensesAdministrative = expensesAdministrative;
  if (expensesFundraising) data.expensesFundraising = expensesFundraising;
  if (expensesOther) data.expensesOther = expensesOther;
  if (expensesProgram) data.expensesProgram = expensesProgram;
  if (expensesUpdated) data.expensesUpdated = expensesUpdated;
  if (location) data.location = location;
  if (mission) data.mission = mission;
  if (name) data.name = startCase(toLower(name));
  if (phoneNumber) data.phoneNumber = phoneNumber;
  if (representative) data.representative = startCase(toLower(representative));
  if (website) data.website = toLower(website);
  if (email) {
    // Ensure the email is valid
    if (validator.validate(email)) data.email = email;
    else invalidData();
  }
  if (banner || logo) {
    // Grab the old banner/logo path
    const { id, banner: oldBanner, logo: oldLogo } = await ctx.client.charity({ ein });
    if (banner) {
      const updatePictureKey = (newPictureKey) => { data.banner = newPictureKey; };
      // Upload the new banner
      await ctx.utils.uploadPicture(params.banner, id, 'charities/banners', updatePictureKey, oldBanner);
    }
    if (logo) {
      const updatePictureKey = (newPictureKey) => { data.logo = newPictureKey; };
      // Upload the new logo
      await ctx.utils.uploadPicture(params.logo, id, 'charities/logos', updatePictureKey, oldLogo);
    }
  }
  // Update the charity information
  await ctx.client.updateCharity({
    data,
    where: {
      ein,
    },
  });
};
