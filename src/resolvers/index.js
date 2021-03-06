const addFunds = require('./Mutations/addFunds');
const charityAuthLink = require('./Mutations/charityAuthLink');
const charityCreate = require('./Mutations/charityCreate');
const charitySignin = require('./Mutations/charitySignin');
const charityStripeConnect = require('./Mutations/charityStripeConnect');
const charitySuggestion = require('./Mutations/charitySuggestion');
const charityUpdate = require('./Mutations/charityUpdate');
const contactMessage = require('./Mutations/contactMessage');
const createCircle = require('./Mutations/createCircle');
const disbandCircle = require('./Mutations/disbandCircle');
const donation = require('./Mutations/donation');
const accountAgeHalo = require('./Mutations/accountAgeHalo');
const handleCircleInvite = require('./Mutations/handleCircleInvite');
const handleCircleRequest = require('./Mutations/handleCircleRequest');
const inviteCircleMember = require('./Mutations/inviteCircleMember');
const kickCircleMember = require('./Mutations/kickCircleMember');
const sendFriendInvite = require('./Mutations/sendFriendInvite');
const setFollowCharityRelation = require('./Mutations/setFollowCharityRelation');
const setCircleRelation = require('./Mutations/setCircleRelation');
const signin = require('./Mutations/signin');
const stripeAccountView = require('./Mutations/stripeAccountView');
const updateCircle = require('./Mutations/updateCircle');
const updateUser = require('./Mutations/updateUser');
const updateUserPicture = require('./Mutations/updateUserPicture');

const _forwarded = require('./Queries/_forwarded');
const aggregateDonations = require('./Queries/aggregateDonations');
const allHalos = require('./Queries/allHalos');
const currentAuthCharity = require('./Queries/currentAuthCharity');
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
    charityAuthLink,
    charityCreate,
    charitySignin,
    charityStripeConnect,
    charitySuggestion,
    charityUpdate,
    contactMessage,
    createCircle,
    disbandCircle,
    donation,
    handleCircleInvite,
    handleCircleRequest,
    inviteCircleMember,
    kickCircleMember,
    sendFriendInvite,
    setFollowCharityRelation,
    setCircleRelation,
    signin,
    stripeAccountView,
    updateCircle,
    updateUser,
    updateUserPicture,
  },
  Query: {
    ..._forwarded,
    aggregateDonations,
    allHalos,
    currentAuthCharity,
    currentUser,
    currentUserBalance,
    ...events,
    newHaloAlert,
    userDots,
    userHalos,
    userLoops,
  },
};
