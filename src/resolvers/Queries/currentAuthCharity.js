module.exports = async (parent, { token }, ctx) => {
  // Grab the token's contents without verifying it
  const decodedToken = ctx.utils.token.decode(token);

  if (decodedToken) {
    // Decoded EIN
    const { ein } = decodedToken;

    // Grab the charity's info
    const charityInfo = '{ authHistory(orderBy: createdAt_DESC) { createdAt } }';
    const { authHistory: [history] } = await ctx.binding.query.charity({ where: { ein } }, charityInfo);

    // Ensure the history actually exists
    if (history) {
      // Validate the token
      const { ein } = ctx.utils.token.validateCharityClient(token, history.createdAt);
      // The auth charity's EIN
      if (ein) return ein;
    }
  }

  // Invalid token
  throw new ctx.utils.errors.CorruptCharityAuthToken();
};
