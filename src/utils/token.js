const { decode, sign, verify } = require('jsonwebtoken');
const rand = require('./rand');

const secret = process.env.APP_SECRET;

const EXPIRES_DEFAULT = '120 days';
const EXPIRES_SHORT = '20 minutes';

const ISSUER = 'Phenominal';

const SUBJECT_DEFAULT = 'Authentication';
const SUBJECT_CHARITY = 'CharityAuthentication';

// Creates dynamic secrets when a date is passed in
const grabSecret = date => `${secret}${date}`;

// Generate a new JWT
const generateToken = (token, date, subject = SUBJECT_DEFAULT, expiresIn = EXPIRES_DEFAULT) => (
  sign(token, grabSecret(date), {
    expiresIn,
    issuer: ISSUER,
    subject,
  })
);

// Check if the JWT has been tampered with and is still valid
const validateToken = (token, date, subject = SUBJECT_DEFAULT, expiresIn = EXPIRES_DEFAULT) => {
  try {
    return verify(token, grabSecret(date), {
      expiresIn,
      issuer: ISSUER,
      subject,
    });
  } catch (e) {
    return false;
  }
};

module.exports = {
  // Random 8 digit securityToken
  createSecurity: () => rand(10000000, 99999999),

  // Decode the JWT without verifying
  decode: token => decode(token),

  // Default user tokens
  generate: data => generateToken(data),
  validate: data => validateToken(data),

  // Charity authLinks tokens
  generateCharityAuth: (data, date) => generateToken(data, date, SUBJECT_CHARITY, EXPIRES_SHORT),
  validateCharityAuth: (data, date) => validateToken(data, date, SUBJECT_CHARITY, EXPIRES_SHORT),

  // Charity client auth tokens
  generateCharityClient: (data, date) => generateToken(data, date, SUBJECT_CHARITY),
  validateCharityClient: (data, date) => validateToken(data, date, SUBJECT_CHARITY),
};
