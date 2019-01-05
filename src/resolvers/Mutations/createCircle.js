module.exports = async (parent, { description, name, open }, ctx) => {
  // Grab the user's id
  const { id } = await ctx.currentUser();
  // Create the Circle
  await ctx.client.createCircle({
    description,
    name,
    open,
    owner: {
      connect: {
        id,
      },
    },
    users: {
      connect: {
        id,
      },
    },
  });
};
