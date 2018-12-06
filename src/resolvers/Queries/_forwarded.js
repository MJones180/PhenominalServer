const { forwardTo } = require('prisma-binding');
const _ = require('lodash');

// All of the fields to forward
const fields = [
  'user', 'users', 'usersConnection',
  'charity', 'charities', 'charitiesConnection',
  'event', 'events', 'eventsConnection',
  'transaction', 'transactions', 'transactionsConnection',
  'specialFundraiser', 'specialFundraisers', 'specialFundraisersConnection',
  'identity', 'identities', 'identitiesConnection',
];

// Complete object of all forwarded fields
const forwarded = {};

// Forward each field to the binding
_.each(fields, (field) => {
  forwarded[field] = forwardTo('binding');
});

module.exports = forwarded;
