module.exports = async (parent, { token }, ctx) => {
  const { ein } = ctx.utils.token.charityAuthLinkDecode(token);
  // const [authHistory] = ctx.client.charity({ ein }).authHistory();
  const { createdAt, authHistory: [history] } = await ctx.binding.query.charity({ where: { ein } },
    '{ createdAt authHistory(orderBy: createdAt_DESC) { createdAt } }');
  const hash = history ? history.createdAt : createdAt;
  if (ctx.utils.token.validateCharityAuthLink(token, hash)) {
    const { createdAt: newCreatedAt, securityToken } = await ctx.client.createCharityAuth({
      securityToken: ctx.utils.token.generateSecurity(),
      charity: { connect: { ein } },
    });
    const clientToken = ctx.utils.token.generateCharityAuth({
      ein,
      securityToken,
    }, newCreatedAt);
    return clientToken;
  }
};
