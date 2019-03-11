// ============================
// allHalos()
// checkCompletion(id, username, key, progress?)
// grabHalo(key, tier?)
// ============================

const find = require('lodash/find');
const map = require('lodash/map');
const reverse = require('lodash/reverse');
const dots = require('./dots');

// Tier levels
const EASY = 'easy';
const MODERATE = 'moderate';
const HARD = 'hard';
const PHENOMINAL = 'phenominal';

// All Halos
// ====================
//  [key]: {
//    description: val => `...${val}...`,
//    tiers: [
//      [requirement, dotReward, tier],
//    ],
//  },
// ====================
const halos = {
  accountAge: {
    description: val => `User for ${val} days`,
    tiers: [
      [720, 100000, PHENOMINAL],
      [365, 10000, HARD],
      [60, 5000, MODERATE],
      [14, 1000, EASY],
    ],
  },
  createCircle: {
    description: () => 'Create first Circle',
    tiers: [
      [1, 500, EASY],
    ],
  },
  firstDonation: {
    description: () => 'First donation',
    tiers: [
      [1, 5000, PHENOMINAL],
    ],
  },
  followCharity: {
    description: val => `Follow ${val} charities`,
    tiers: [
      [200, 50000, PHENOMINAL],
      [100, 10000, HARD],
      [25, 2500, MODERATE],
      [10, 500, EASY],
    ],
  },
  loopCount: {
    description: val => `Gain ${val} Loops`,
    tiers: [
      [500, 1000000, PHENOMINAL],
      [100, 100000, HARD],
      [25, 25000, MODERATE],
      [10, 5000, EASY],
    ],
  },
  newUser: {
    description: () => 'Create an account',
    tiers: [
      [1, 0, EASY],
    ],
  },
  setProfilePic: {
    description: () => 'Set profile picture',
    tiers: [
      [1, 500, EASY],
    ],
  },
};

module.exports = (binding, client) => ({
  // Grab all of the Halos
  allHalos: () => (
    // Loop through each Halo
    map(halos, ({ tiers, description }, key) => ({
      key,
      // Loop through each tier, flip so lowest tier first
      tiers: reverse(map(tiers, ([requirement, dotReward, tier]) => ({
        // Generate the description
        description: description(requirement),
        dotReward,
        tier,
      }))),
    }))
  ),
  // Check if a Halo has been completed
  // Progress can be omitted if it is a single tier Halo
  checkCompletion: async (id, username, key, progress = 1) => {
    // Grab the highest tier of completion
    const tierInfo = find(halos[key].tiers, ([requirement]) => (progress >= requirement));
    // A Halo has been completed
    if (tierInfo) {
      // The tier's info
      const [, dotReward, tier] = tierInfo;
      // Check if the Halo already exists
      const exists = await binding.exists.Halo({
        key,
        tier,
        user: { id },
      });
      // If it is a newly achieved Halo, add it
      if (!exists) {
        // Add the Halo
        await client.createHalo({
          key,
          tier,
          user: {
            connect: { id },
          },
        });
        // Check if there is a Dot reward for completion
        if (dotReward) {
          // Add the Dots
          await dots(client).addDots({
            action: `Halo (${key})`,
            amount: dotReward,
            username,
          });
        }
      }
    }
  },
  // Grab a Halo's data
  grabHalo: (key, searchTier) => {
    // Grab the description and tiers
    const { description, tiers } = halos[key];
    // Find the tier information, if tier is omitted default to the first tier in array
    const tierInfo = searchTier ? find(tiers, ([,, foundTier]) => searchTier == foundTier) : tiers[0];
    // The tier info
    const [requirement,, tier] = tierInfo;
    // Return the data
    return {
      description: description(requirement),
      key,
      tier,
    };
  },
});
