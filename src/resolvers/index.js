const addFunds = require('./Mutations/addFunds');
const charitySuggestion = require('./Mutations/charitySuggestion');
const contactMessage = require('./Mutations/contactMessage');
const createCircle = require('./Mutations/createCircle');
const disbandCircle = require('./Mutations/disbandCircle');
const donation = require('./Mutations/donation');
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
    createCircle,
    disbandCircle,
    donation,
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
    currentUser,
    currentUserBalance,
    ...events,
    userDots,
    userLoops,
  },
};
