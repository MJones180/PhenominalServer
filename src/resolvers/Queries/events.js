const getDate = () => new Date().toISOString();

// Combine together all of the props
const merge = (args, type) => {
  const { charityEIN, ...props } = args;

  const conditions = () => {
    if (!charityEIN) return type;
    return ({
      charity: {
        ein: charityEIN,
      },
      ...type,
    });
  };

  return {
    where: conditions(),
    ...props,
  };
};

const current = () => ({
  // Start <= Date
  startDate_lte: getDate(),
  // End > Date
  endDate_gt: getDate(),
});

// End < Date
const past = () => ({ endDate_lt: getDate() });

// Start > Date
const upcoming = () => ({ startDate_gt: getDate() });

// Grab the event data for the correct time period
const wrapper = async (parent, args, ctx, info, period) => ctx.binding.query.events(merge(args, period), info);

module.exports = {
  eventsCurrent: async (...props) => wrapper(...props, current()),
  eventsPast: async (...props) => wrapper(...props, past()),
  eventsUpcoming: async (...props) => wrapper(...props, upcoming()),
};
