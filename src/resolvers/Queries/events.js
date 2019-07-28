const grabEvents = period => async (parent, { charityEIN, ...props }, ctx, info) => {
  const args = charityEIN ? {
    where: { charity: { ein: charityEIN } },
    ...props,
  } : props;
  return ctx.utils.grabEvents[period](args, info);
};

module.exports = {
  eventsCurrent: grabEvents('current'),
  eventsPast: grabEvents('past'),
  eventsUpcoming: grabEvents('upcoming'),
};
