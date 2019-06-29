const mapValues = require('lodash/mapValues');
const { createError } = require('apollo-errors');

const errors = {
  CharityAlreadyExists: 'The information provided for the charity already exists.',
  CircleNameExists: 'The requested Circle name already exists.',
  CorruptAuthToken: 'The sent user authToken has been corrupted.',
  CorruptCharityAuthClientToken: 'The sent charity client authToken has been corrupted.',
  CorruptCharityAuthLinkToken: 'The sent charity authLink token has been corrupted.',
  InsufficientFunds: 'Insufficient funds to process the requested donations.',
  InvalidCircleData: 'Data passed to create/update the Circle is invalid.',
  InvalidUser: 'The authToken contains either a non-existant user or an invalid securityToken.',
  InvalidUserData: 'Data passed to update the user information is invalid.',
  NotAuthenticated: 'The user is not authenticated.',
  UsernameAlreadyExists: 'The requested username is already taken.',
};

// Properly format each error
module.exports = mapValues(errors, (message, key) => createError(key, { message }));
