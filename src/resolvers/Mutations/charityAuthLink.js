const trim = require('lodash/trim');

module.exports = async (parent, { email }, ctx) => {
  // Grab the charity's info
  const info = '{ createdAt ein name representative authHistory(orderBy: createdAt_DESC) { createdAt } }';
  const charityInfo = await ctx.binding.query.charity({ where: { email: trim(email) } }, info);
  const { createdAt, ein, name: charity, representative, authHistory: [history] } = charityInfo;

  // Use the timestamp from the most recent auth for single-use authLink tokens
  const secret = history ? history.createdAt : createdAt;
  // Tokens contain the charity's EIN
  const token = ctx.utils.token.generateCharityAuth({ ein }, secret);

  const __PROD__ = (process.env.STAGE) == 'prod';
  // The link that the authLink should redirect to
  const getAuthLink = domain => `https://${domain}/charities/admin/auth/cb/${token}/`;
  const authLink = __PROD__ ? getAuthLink('phenominal.fund') : getAuthLink('localhost:3000');

  // Send the authLink email
  ctx.utils.email.charityAuthLink({
    authLink,
    charity,
    email,
    representative,
  });
};
