const { decode, validateCharityClient } = require('../utils/token');
const errors = require('../utils/errors');

module.exports = binding => async (token) => {
  // Grab the token's contents without verifying it
  const decodedToken = decode(token);

  if (decodedToken) {
    // Decoded EIN
    const { ein } = decodedToken;

    // Grab the charity's info
    const charityInfo = '{ authHistory(orderBy: createdAt_DESC) { createdAt } }';
    const { authHistory: [history] } = await binding.query.charity({ where: { ein } }, charityInfo);

    // Ensure the history actually exists
    if (history) {
      // Validate the token
      const { ein } = validateCharityClient(token, history.createdAt);
      // The auth charity's EIN
      if (ein) return ein;
    }
  }

  // Invalid token
  throw new errors.CorruptCharityAuthClientToken();
};
