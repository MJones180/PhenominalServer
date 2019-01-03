const addFunds = require('./Mutations/addFunds');
const charitySuggestion = require('./Mutations/charitySuggestion');
const contactMessage = require('./Mutations/contactMessage');
const donation = require('./Mutations/donation');
const flipFollowedCharity = require('./Mutations/flipFollowedCharity');
const signin = require('./Mutations/signin');
const updateUser = require('./Mutations/updateUser');
const updateUserPicture = require('./Mutations/updateUserPicture');

const _forwarded = require('./Queries/_forwarded');
const aggregateDonations = require('./Queries/aggregateDonations');
const currentUser = require('./Queries/currentUser');
const currentUserBalance = require('./Queries/currentUserBalance');
const events = require('./Queries/events');
const userDots = require('./Queries/userDots');
const userLoops = require('./Queries/userLoops');

module.exports = {
  Mutation: {
    addFunds,
    charitySuggestion,
    contactMessage,
    donation,
    flipFollowedCharity,
    signin,
    updateUser,
    updateUserPicture,
  },
  Query: {
    ..._forwarded,
    aggregateDonations,
    currentUser,
    currentUserBalance,
    ...events,
    userDots,
    userLoops,
  },
};
