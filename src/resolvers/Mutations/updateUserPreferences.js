module.exports = async (parent, { allowDonationEmails }, ctx) => {
  // Ensure a user token exists
  ctx.user();

  // Grab the user's id from currentUser because it also verifies the securityToken
  const { id } = await ctx.resolvers.Query.currentUser(parent, {}, ctx, '{ id }');

  // Update the user's info
  ctx.db.mutation.updateUser({
    data: {
      preferences: {
        update: {
          allowDonationEmails,
        },
      },
    },
    where: {
      id,
    },
  });
};
