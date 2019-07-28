const getDate = () => new Date().toISOString();

module.exports = (binding) => {
  const grabEvents = period => (
    async ({ where = {}, ...props }, info) => (
      binding.query.events({
        where: {
          ...where,
          // Corresponding time period
          ...period,
        },
        ...props,
      }, info)
    )
  );

  return {
    current: grabEvents({
      // Start <= Date
      startDate_lte: getDate(),
      // End > Date
      endDate_gt: getDate(),
    }),
    past: grabEvents({
      // End < Date
      endDate_lt: getDate(),
    }),
    upcoming: grabEvents({
      // Start > Date
      startDate_gt: getDate(),
    }),
  };
};
