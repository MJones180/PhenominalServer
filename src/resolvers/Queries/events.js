const date = new Date().toISOString();

// Return an AND conditional
const and = (arg1, arg2) => ({ AND: [arg1, arg2] });

// Combine together all of the props
const merge = (args, type) => {
  const { charityEIN, ...props } = args;

  const conditions = () => {
    if (!charityEIN) return type;
    return and({
      charity: {
        ein: charityEIN,
      },
    }, type);
  };

  return {
    where: conditions(),
    ...props,
  };
};

const current = and(
  // Start <= Date
  { startDate_lte: date },
  // End > Date
  { endDate_gt: date }
);

// End < Date
const past = { endDate_lt: date };

// Start > Date
const upcoming = { startDate_gt: date };

// Grab the event data for the correct time period
const wrapper = async (parent, args, ctx, info, period) => ctx.db.query.events(merge(args, period), info);

module.exports = {
  eventsCurrent: async (...props) => wrapper(...props, current),
  eventsPast: async (...props) => wrapper(...props, past),
  eventsUpcoming: async (...props) => wrapper(...props, upcoming),
};
