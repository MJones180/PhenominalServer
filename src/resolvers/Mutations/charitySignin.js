module.exports = async (parent, { token }, ctx) => {
  // Grab the token's contents without verifying it
  const { ein } = ctx.utils.token.decode(token);

  // Grab the charity's info
  const charityInfo = '{ createdAt authHistory(orderBy: createdAt_DESC) { createdAt } }';
  const { createdAt, authHistory: [history] } = await ctx.binding.query.charity({ where: { ein } }, charityInfo);

  // The timestamp to decode with
  const secret = history ? history.createdAt : createdAt;

  // Validate the token, ensure it is not expired or tampered with
  if (ctx.utils.token.validateCharityAuth(token, secret)) {
    // The new timestamp will be used for client validation and the next authLink
    const { createdAt: newSecret } = await ctx.client.createCharityAuthHistory({ charity: { connect: { ein } } });
    // Return the generated client token
    return ctx.utils.token.generateCharityClient({ ein }, newSecret);
  }
  // Invalid token
  throw new ctx.utils.errors.CorruptCharityAuthToken();
};
