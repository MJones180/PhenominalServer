const validator = require('email-validator');
const mapValues = require('lodash/mapValues');
const startCase = require('lodash/startCase');
const toLower = require('lodash/toLower');
const toUpper = require('lodash/toUpper');
const trim = require('lodash/trim');

module.exports = async (parent, { token, ...params }, ctx) => {
  const ein = await ctx.utils.currentAuthCharity(token);
  console.log('ein: ', ein);
  console.log('params: ', params);

  // Trimmed params
  const { acronym, bannerCredit, email, location, mission, name, representative, website } = mapValues(params, param => (param ? trim(param) : param));

  const { expensesAdministrative, expensesFundraising, expensesOther, expensesProgram, expensesUpdated, phoneNumber } = params;

  const { banner, logo } = params;

  // Properties to update
  const data = {};

  // Throw an error if any of the data is invalid
  const invalidData = () => {
    throw new ctx.utils.errors.InvalidCharityData();
  };

  if (email == '' || name == '' || representative == '' || website == '') {
    console.log('email == \'\' || name == \'\' || representative == \'\' || website == \'\'');
    invalidData();
  }

  if (acronym) data.acronym = toUpper(acronym);
  if (bannerCredit) data.bannerCredit = toLower(startCase(bannerCredit));
  if (email) {
    if (validator.validate(email)) data.email = email;
    else {
      console.log('invalid email');
      invalidData();
    }
  }
  if (expensesAdministrative) data.expensesAdministrative = expensesAdministrative;
  if (expensesFundraising) data.expensesFundraising = expensesFundraising;
  if (expensesOther) data.expensesOther = expensesOther;
  if (expensesProgram) data.expensesProgram = expensesProgram;
  if (expensesUpdated) data.expensesUpdated = expensesUpdated;
  if (location) data.location = location;
  if (mission) data.mission = mission;
  if (name) data.name = toLower(startCase(name));
  if (phoneNumber) data.phoneNumber = phoneNumber;
  if (representative) data.representative = toLower(startCase(representative));
  if (website) data.website = toLower(website);
  if (banner || logo) {
    // Grab the user's info
    const { id, banner: oldBanner, logo: oldLogo } = await ctx.client.charity({ ein });

    if (banner) {
      const updatePictureKey = (newPictureKey) => { data.banner = newPictureKey; };
      await ctx.utils.uploadPicture(params.banner, id, 'charities/banners', updatePictureKey, oldBanner);
    }
    if (logo) {
      const updatePictureKey = (newPictureKey) => { data.logo = newPictureKey; };
      await ctx.utils.uploadPicture(params.logo, id, 'charities/logos', updatePictureKey, oldLogo);
    }
  }
  await ctx.client.updateCharity({
    data,
    where: {
      ein,
    },
  });
};
