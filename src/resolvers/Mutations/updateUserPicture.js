module.exports = async (parent, params, ctx) => {
  // Grab the user's info
  const { id, username, picture: oldPictureKey } = await ctx.currentUser();

  // Update picture key in db
  const updatePictureKey = async newPictureKey => (
    // Update the user's picture field with the new key
    ctx.client.updateUser({
      data: { picture: newPictureKey },
      where: { id },
    })
  );

  await ctx.utils.uploadPicture(params.picture, id, 'pictures', updatePictureKey, oldPictureKey);

  // Add the setProfilePic Halo if needed
  ctx.utils.halos.checkCompletion(id, username, 'setProfilePic');
};
