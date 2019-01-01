const findIndex = require('lodash/findIndex');

module.exports = (loops) => {
  // Make sure a valid number of loops is passed
  if (!loops) return { count: loops };

  // [Min Loops, Rank, Boost]
  const stages = [
    [1000, 'Phenominal', 10],
    [365, 'Phenomenal', 8],
    [305, 'Philanthropist III', 6],
    [265, 'Philanthropist II', 6],
    [225, 'Philanthropist I', 6],
    [185, 'Change Maker III', 5],
    [155, 'Change Maker II', 5],
    [125, 'Change Maker I', 5],
    [95, 'Altruist III', 4],
    [80, 'Altruist II', 4],
    [65, 'Altruist I', 4],
    [50, 'Patron III', 3],
    [40, 'Patron II', 3],
    [30, 'Patron I', 3],
    [20, 'Regular III', 2],
    [15, 'Regular II', 2],
    [10, 'Regular I', 2],
    [6, 'Newcomer III', 1],
    [3, 'Newcomer II', 1],
    [1, 'Newcomer I', 1],
  ];

  // Grab the first stage where the user has enough loops
  // This will be the user's Loop rank
  const index = findIndex(stages, stage => (loops >= stage[0]));

  // Current stage data
  const [min, rank, boost] = stages[index];

  // Loop goal of next stage
  const goal = (index > 0) && stages[index - 1][0];

  return { min, rank, boost, goal, count: loops };
};
