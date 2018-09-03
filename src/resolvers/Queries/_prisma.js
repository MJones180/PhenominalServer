const { forwardTo } = require('prisma-binding');

module.exports = {
  user: forwardTo('db'),
  users: forwardTo('db'),
  usersConnection: forwardTo('db'),

  charity: forwardTo('db'),
  charities: forwardTo('db'),
  charitiesConnection: forwardTo('db'),

  event: forwardTo('db'),
  events: forwardTo('db'),
  eventsConnection: forwardTo('db'),

  transaction: forwardTo('db'),
  transactions: forwardTo('db'),
  transactionsConnection: forwardTo('db'),

  specialFundraiser: forwardTo('db'),
  specialFundraisers: forwardTo('db'),
  specialFundraisersConnection: forwardTo('db'),

  identity: forwardTo('db'),
  identities: forwardTo('db'),
  identitiesConnection: forwardTo('db'),
};
