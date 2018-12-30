const { validateAuth } = require('../utils/token');
const errors = require('../utils/errors');

module.exports = async (resolve, root, args, ctx, info) => {
  // Check if the request contains an Authorization token
  const authorization = ctx.request.get('Authorization');
  // Append function to the context chain for resolving user information
  const setCurrentUser = (func) => { ctx.currentUser = func; };
  // Throw error if the user is not authenticated
  if (!authorization) setCurrentUser(() => { throw new errors.NotAuthenticated(); });
  else {
    // Grab the token contents
    const token = validateAuth(authorization.replace('Bearer ', ''));
    // Easy access to userID
    const { userID } = token;
    // Grab the user's balance (and key)
    const grabBalance = async () => {
      // Grab the user's most recent transaction
      const [transaction] = await ctx.client
        .user({ id: userID })
        .transactions({ first: 1, orderBy: 'key_DESC' });
      // If no balance, default to 0
      const balance = (transaction && transaction.balance) || 0;
      // Also return the transaction's key, defaults to a key number of 0
      const key = (transaction && transaction.key) || ctx.utils.transactionKey.generate(userID, 0);
      return { balance, key };
    };
    // Grab the user's information
    const grabInfo = async (info) => {
      // Query the user based on the userID and securityToken from the authToken
      const [user] = await ctx.binding.query.users({
        where: {
          id: userID,
          securityToken: token.securityToken,
        },
      }, info);
      // If the user is found return the requested info and a grabBalance function
      if (user) return { ...user, grabBalance };
      // Throw error if user is not found or the securityToken is invalid
      throw new errors.InvalidUser();
    };
    // Implemented as a function so the db is only queried when the resolver needs the user's information
    if (token) setCurrentUser(grabInfo);
    // Throw error if token is corrupted
    else setCurrentUser(() => { throw new errors.CorruptAuthToken(); });
  }
  // Continue to the resolver
  return resolve(root, args, ctx, info);
};
