const each = require('lodash/each');
const flatMap = require('lodash/flatMap');

module.exports = async (parent, { currentUser, eventID }, ctx) => {
  // The values used for calculating the aggregations
  const values = '{ amount firstOfBatch }';
  // The data to aggregate
  let data;
  if (currentUser) { // Current user's donations should be aggregated
    // Grab the donations through the user's funds
    const { funds } = await ctx.currentUser(`{ funds { donations ${values} } }`);
    // Since the donations are double nested, flapMap them into a single array
    data = flatMap(funds, ({ donations }) => donations);
  } else if (eventID) { // Event's donations should be aggregated
    // All donations are under the 'donations' key
    data = (
      // Grab the donations off of the corresponding event
      await ctx.binding.query.event({ where: { id: eventID } }, `{ donations ${values} }`)
    ).donations;
  } else { // All donations should be aggregated
    // Simply query all transfers (donations)
    data = await ctx.binding.query.transfers({}, values);
  }
  // The data to return
  const results = { count: 0, total: 0 };
  // Loop through each donation
  each(data, ({ amount, firstOfBatch }) => {
    // Count batches as one, only include the first partition
    if (firstOfBatch) results.count += 1;
    // Increment the total amount donated
    results.total += amount;
  });
  console.log('results: ', results);
  // Return to client
  return results;
};
