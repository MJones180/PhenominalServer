// ============================
// Key to identify transactions
// Format: [userID]-[keyNumber]
// ============================

const split = require('lodash/split');
const padStart = require('lodash/padStart');
const parseInt = require('lodash/parseInt');

module.exports = {
  // Grab the key number
  getNumber: key => parseInt(split(key, '-')[1]),
  // Generate key, pad the number to 6 digits (necessary for ordering)
  generate: (userID, number) => `${userID}-${padStart(number, 6, '0')}`,
};
