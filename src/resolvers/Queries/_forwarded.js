const { forwardTo } = require('prisma-binding');
const _ = require('lodash');

// All of the fields to forward
const fields = [
  'charity', 'charities', 'charitiesConnection',
  'circle', 'circles', 'circlesConnection',
  'event', 'events', 'eventsConnection',
  'user', 'users', 'usersConnection',
];

// Complete object of all forwarded fields
const forwarded = {};

// Forward each field to the binding
_.each(fields, (field) => {
  forwarded[field] = forwardTo('binding');
});

module.exports = forwarded;
