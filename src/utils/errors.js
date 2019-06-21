const { createError } = require('apollo-errors');

module.exports = {
  CircleNameExists: createError('CircleNameExists', {
    message: 'The requested Circle name already exists.',
  }),
  CorruptAuthToken: createError('CorruptAuthToken', {
    message: 'The sent authToken has been corrupted.',
  }),
  InsufficientFunds: createError('InsufficientFunds', {
    message: 'Insufficient funds to process the requested donations.',
  }),
  InvalidCharityAuthLinkToken: createError('InvalidCharityAuthLinkToken', {
    message: 'The charity authentication token is invalid.',
  }),
  InvalidCircleData: createError('InvalidCircleData', {
    message: 'Data passed to create/update the Circle is invalid.',
  }),
  InvalidUser: createError('InvalidUser', {
    message: 'The authToken contains either a non-existant user or an invalid securityToken.',
  }),
  InvalidUserData: createError('InvalidUserData', {
    message: 'Data passed to update the user information is invalid.',
  }),
  NotAuthenticated: createError('NotAuthenticated', {
    message: 'The user is not authenticated.',
  }),
  UsernameAlreadyExists: createError('UsernameAlreadyExists', {
    message: 'The requested username is already taken.',
  }),
};
