const addFunds = require('./Mutations/addFunds');
const charitySuggestion = require('./Mutations/charitySuggestion');
const contactMessage = require('./Mutations/contactMessage');
const createCircle = require('./Mutations/createCircle');
const disbandCircle = require('./Mutations/disbandCircle');
const donation = require('./Mutations/donation');
const accountAgeHalo = require('./Mutations/accountAgeHalo');
const handleCircleInvite = require('./Mutations/handleCircleInvite');
const handleCircleRequest = require('./Mutations/handleCircleRequest');
const inviteCircleMember = require('./Mutations/inviteCircleMember');
const kickCircleMember = require('./Mutations/kickCircleMember');
const setFollowCharityRelation = require('./Mutations/setFollowCharityRelation');
const setCircleRelation = require('./Mutations/setCircleRelation');
const signin = require('./Mutations/signin');
const updateCircle = require('./Mutations/updateCircle');
const updateUser = require('./Mutations/updateUser');
const updateUserPicture = require('./Mutations/updateUserPicture');

const _forwarded = require('./Queries/_forwarded');
const aggregateDonations = require('./Queries/aggregateDonations');
const allHalos = require('./Queries/allHalos');
const currentUser = require('./Queries/currentUser');
const currentUserBalance = require('./Queries/currentUserBalance');
const events = require('./Queries/events');
const newHaloAlert = require('./Queries/newHaloAlert');
const userDots = require('./Queries/userDots');
const userHalos = require('./Queries/userHalos');
const userLoops = require('./Queries/userLoops');

module.exports = {
  Mutation: {
    accountAgeHalo,
    addFunds,
    charitySuggestion,
    contactMessage,
    createCircle,
    disbandCircle,
    donation,
    handleCircleInvite,
    handleCircleRequest,
    inviteCircleMember,
    kickCircleMember,
    setFollowCharityRelation,
    setCircleRelation,
    signin,
    updateCircle,
    updateUser,
    updateUserPicture,
  },
  Query: {
    ..._forwarded,
    aggregateDonations,
    allHalos,
    currentUser,
    currentUserBalance,
    ...events,
    newHaloAlert,
    userDots,
    userHalos,
    userLoops,
  },
};
