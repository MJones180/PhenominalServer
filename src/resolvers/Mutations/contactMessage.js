module.exports = async (parent, props, ctx) => {
  // Send an email to support with the message
  ctx.utils.email.contactMessage(props);
};
