const { validateAuth } = require('./token');

module.exports = (req, errors) => {
  // Check if the request contains auth information
  const auth = req.request.get('Authorization');
  if (auth) {
    const token = auth.replace('Bearer ', '');
    // Verify that the token is still valid
    const data = validateAuth(token);
    // Return its contents if it is valid
    if (data) return () => data;
    // Throw error if it is corrupted
    return () => { throw new errors.CorruptAuthToken(); };
  }
  // Throw error if the user is not auth
  return () => { throw new errors.NotAuthenticated(); };
};
