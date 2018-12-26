module.exports = async (parent, params, ctx) => {
  // Grab the user's id
  const { id, picture: oldPictureKey } = await ctx.currentUser();

  // Grab the stream and type from the picture param
  const { createReadStream, mimetype } = await params.picture;

  // Read from the stream
  const stream = createReadStream();

  // Mimetype -> extension
  const extensions = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
  };

  // Grab corresponding extension
  const extension = extensions[mimetype];

  // Ensure a valid extension is passed
  if (!extension) return;

  // Current timestamp for uniqueness
  const timestamp = new Date().getTime();

  // Key under which the picture will be stored
  const newPictureKey = `pictures/${id}_${timestamp}.${extension}`;

  // Upload the picture
  const upload = async () => (
    // Promise to wait for the stream to upload
    ctx.utils.wait(async (done, reject) => (
      // Upload to S3
      ctx.utils.aws.s3.upload({
        // Make viewable to all
        ACL: 'public-read',
        // Path and name of file
        Key: newPictureKey,
        // Enable picture to be seen without download
        ContentType: mimetype,
        // Picture stream
        Body: stream,
      }, err => (err ? reject(err) : done()))
    ))
  );

  // Update picture key in db
  const updatePictureKey = async () => (
    // Update the user's picture field with the new key
    ctx.client.updateUser({
      data: { picture: newPictureKey },
      where: { id },
    })
  );

  // Delete the old picture from S3
  const deleteOldPicture = async () => {
    // Ensure a picture already existed
    if (!oldPictureKey) return;
    // Delete based on old key stored in db
    return ctx.utils.aws.s3.deleteObject({ Key: oldPictureKey }, err => (err && console.log(err)));
  };

  // Upload the new picture
  await upload();

  // Update in the db
  await updatePictureKey();

  // Delete the old picture
  await deleteOldPicture();
};
