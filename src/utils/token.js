const jwt = require('jsonwebtoken');
const rand = require('./rand');

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
  generateSecurity: () => rand(10000000, 99999999),

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
