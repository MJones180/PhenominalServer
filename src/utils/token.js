const jwt = require('jsonwebtoken');

const secret = process.env.APP_SECRET;

const authTokenOptions = {
  expiresIn: '120 days',
  issuer: 'Phenominal',
  subject: 'Authentication',
};

module.exports = {
  // Generate an auth token, sign the JWT
  generateAuth: data => jwt.sign(data, secret, authTokenOptions),

  // Generate a random 8 digit security token
  generateSecurity: () => Math.floor(Math.random() * 90000000) + 10000000,

  // Verify the JWT
  validateAuth: (token) => {
    try {
      const { exp, iat, iss, sub, ...data } = jwt.verify(token, secret, authTokenOptions);
      return data;
    } catch (e) {
      return false;
    }
  },
};
