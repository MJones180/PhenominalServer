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

  charityAuthLinkDecode: token => jwt.decode(token),
  generateCharityAuthLink: (data, date) => (
    jwt.sign(data, `${secret}${date}`, {
      expiresIn: '20 minutes',
      issuer: 'Phenominal',
      subject: 'CharityAuthentication',
    })
  ),
  generateCharityAuth: (data, date) => (
    jwt.sign(data, `${secret}${date}`, {
      expiresIn: '120 days',
      issuer: 'Phenominal',
      subject: 'CharityAuthentication',
    })
  ),
  validateCharityAuthLink: (token, date) => {
    try {
      const { exp, iat, iss, sub, ...data } = jwt.verify(token, `${secret}${date}`, {
        expiresIn: '20 minutes',
        issuer: 'Phenominal',
        subject: 'CharityAuthentication',
      });
      return data;
    } catch (e) {
      return false;
    }
  },
};
