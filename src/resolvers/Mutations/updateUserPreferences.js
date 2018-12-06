module.exports = async (parent, { allowDonationEmails }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();
  // Update the user's preferences
  return ctx.client.updateUser({
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
