const { decode, validateCharityClient } = require('../utils/token');
const errors = require('../utils/errors');

module.exports = binding => async (token) => {
  // Grab the token's contents without verifying it
  const decodedToken = decode(token);

  // Ensure the token is actually a JWT
  if (decodedToken) {
    // History to use
    const { authHistory: [history] } = await binding.query.charity(
      // EIN from the token's payload
      { where: { ein: decodedToken.ein } },
      // Charity's last authHistory
      '{ authHistory(orderBy: createdAt_DESC) { createdAt } }'
    );

    // Ensure the charity actually has an authHistory
    if (history) {
      // Validate the token
      const { ein } = validateCharityClient(token, history.createdAt);
      // The auth charity's EIN
      if (ein) return ein;
    }
  }

  // Invalid token
  throw new errors.CorruptCharityAuthToken();
};
