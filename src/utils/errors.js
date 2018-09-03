const { createError } = require('apollo-errors');

module.exports = {
  CorruptAuthToken: createError('CorruptAuthToken', {
    message: 'The sent authToken has been corrupted.',
  }),
  InsufficientFunds: createError('InsufficientFunds', {
    message: 'Insufficient funds to process the requested donations.',
  }),
  InvalidUser: createError('InvalidUser', {
    message: 'The authToken contains either a non-existant user or an invalid securityToken.',
  }),
  NotAuthenticated: createError('NotAuthenticated', {
    message: 'The user is not authenticated.',
  }),
};
