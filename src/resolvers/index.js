const _prisma = require('./Queries/_prisma');
const currentUser = require('./Queries/currentUser');
const events = require('./Queries/events');
const grabUserBalance = require('./Queries/grabUserBalance');
const transactionsAggregate = require('./Queries/transactionsAggregate');

const addDonations = require('./Mutations/addDonations');
const addFunds = require('./Mutations/addFunds');
const charitySuggestion = require('./Mutations/charitySuggestion');
const contactMessage = require('./Mutations/contactMessage');
const signin = require('./Mutations/signin');
const updateUserPersonal = require('./Mutations/updateUserPersonal');
const updateUserPreferences = require('./Mutations/updateUserPreferences');
const updateUserSecurityToken = require('./Mutations/updateUserSecurityToken');

module.exports = {
  Query: {
    ..._prisma,
    currentUser,
    ...events,
    grabUserBalance,
    transactionsAggregate,
  },
  Mutation: {
    addDonations,
    addFunds,
    charitySuggestion,
    contactMessage,
    signin,
    updateUserPersonal,
    updateUserPreferences,
    updateUserSecurityToken,
  },
};
