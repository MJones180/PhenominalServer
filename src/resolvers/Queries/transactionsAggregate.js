const reduce = require('lodash/reduce');

module.exports = async (parent, { forEvent, forUser }, ctx) => {
  let condition = {};
  if (forEvent) {
    condition = {
      event: {
        id: forEvent,
      },
    };
  }
  if (forUser) {
    condition = {
      user: {
        id: ctx.user().userID,
      },
    };
  }

  const data = await ctx.db.query.transactions({
    where: {
      AND: [condition, {
        type: 'DONATION',
      }],
    },
  }, '{ amount }');

  if (data[0]) {
    return {
      count: data.length,
      total: reduce(data, (total, { amount }) => total + amount, 0),
    };
  }

  return {
    count: 0,
    total: 0,
  };
};
