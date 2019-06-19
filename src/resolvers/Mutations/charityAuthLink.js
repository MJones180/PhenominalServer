const trim = require('lodash/trim');

module.exports = async (parent, { email }, ctx) => {
  const { createdAt, ein, name: charity, representative, authHistory: [history] } = await ctx.binding.query.charity({
    where: { email: trim(email) },
  }, '{ createdAt ein name representative authHistory(orderBy: createdAt_DESC) { createdAt } }');
  const hash = history ? history.createdAt : createdAt;
  const token = ctx.utils.token.generateCharityAuthLink({ ein }, hash);
  const authLink = ((process.env.STAGE) == 'prod') ? `https://phenominal.fund/charities/admin/auth/cb/${token}/` : `https://localhost:3000/charities/admin/auth/cb/${token}/`;
  ctx.utils.email.charityAuthLink({
    authLink,
    charity,
    email,
    representative,
  });
};
