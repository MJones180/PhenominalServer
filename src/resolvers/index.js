const addFunds = require('./Mutations/addFunds');
const charitySuggestion = require('./Mutations/charitySuggestion');
const contactMessage = require('./Mutations/contactMessage');
const donation = require('./Mutations/donation');
const signin = require('./Mutations/signin');
const updateUser = require('./Mutations/updateUser');

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
    signin,
    updateUser,
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
