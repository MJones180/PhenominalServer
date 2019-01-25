// ============================
// checkCompletion(id, username, key, val?)
// grabHalo(key, tier?)
// ============================

const find = require('lodash/find');
const dots = require('./dots');

// Tier levels
const EASY = 'easy';
const MODERATE = 'moderate';
const HARD = 'hard';
const PHENOMINAL = 'phenominal';

// All Halos
// ====================
// Tiered Halo
//  [key]: {
//    description: val => `...${val}...`,
//    tiers: [
//      [requirement, dotReward, tier],
//    ],
//  },
// Single Halo
//  [key]: {
//    description: '...',
//    dotReward: x,
//  },
// ====================
const halos = {
  accountAge: {
    description: val => `Member for ${val} days.`,
    tiers: [
      [720, 100000, PHENOMINAL],
      [365, 10000, HARD],
      [180, 5000, MODERATE],
      [30, 1000, EASY],
    ],
  },
  createCircle: {
    description: 'Created first Circle.',
    dotReward: 5000,
  },
  firstDonation: {
    description: 'First donation.',
    dotReward: 5000,
  },
  followCharity: {
    description: val => `Follow ${val} charities.`,
    tiers: [
      [365, 100000, PHENOMINAL],
      [100, 10000, HARD],
      [25, 5000, MODERATE],
      [10, 1000, EASY],
    ],
  },
  loopCount: {
    description: val => `Gain ${val} Loops.`,
    tiers: [
      [365, 100000, PHENOMINAL],
      [100, 10000, HARD],
      [25, 5000, MODERATE],
      [10, 1000, EASY],
    ],
  },
  setProfilePic: {
    description: 'Set profile picture.',
    dotReward: 5000,
  },
};

module.exports = (binding, client) => ({
  // Check if a Halo has been completed
  checkCompletion: async (id, username, key, val) => {
    const { tiers } = halos[key];
    const completed = find(tiers, ([requirement]) => (val >= requirement));
    if (completed) {
      const [, dotReward, tier] = completed;
      const exists = await binding.exists.Halo({
        key,
        tier,
        user: { id },
      });
      // If it is a newly achieved Halo, add it
      if (!exists) {
        await client.createHalo({
          key,
          tier,
          user: {
            connect: { id },
          },
        });
        await dots(client).addDots({
          action: `Halo (${key})`,
          amount: dotReward,
          username,
        });
      }
    }
  },
  grabHalo: (key, tier) => {
    const { tiers } = halos[key];
    if (tier) {
      const halo = find(tiers, ([,, innerTier]) => tier == innerTier);
      const [requirement, dotReward, haloTier] = halo;
    }
  },
  grabAllActiveHalos: () => {

  },
});
