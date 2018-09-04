const { OAuth2Client } = require('google-auth-library');

module.exports = (token, cb) => {
  // Google public and private key
  const publicKey = process.env.GOOGLE_PUBLIC;
  const privateKey = process.env.GOOGLE_PRIVATE;
  // Auth object
  const gapiClient = new OAuth2Client(publicKey, privateKey, '');
  const options = {
    idToken: token,
    audiance: publicKey,
  };
  // Verify the token and grab the user's information
  gapiClient.verifyIdToken(options, (e, login) => {
    const data = login.getPayload();
    cb({
      email: data.email,
      nameFirst: data.given_name,
      nameLast: data.family_name,
      providerID: data.sub,
    });
  });
};
