const map = require('lodash/map');
const uniqBy = require('lodash/uniqBy');

module.exports = async (parent, { username }, ctx) => {
  // Grab the user's Halos, newest first
  const halos = await ctx.client
    .user({ username })
    .halos({ orderBy: 'createdAt_DESC' });
  // Grab each of the Halo's info
  const data = map(halos, halo => ({
    ...ctx.utils.halos.grabHalo(halo.key, halo.tier),
    date: halo.createdAt,
  }));
  // Return just the highest tier of each Halo
  return uniqBy(data, 'key');
};
