module.exports = async (parent, { ein, email, name, url }, ctx) => {
  // Send an email to support with the charity suggestion
  ctx.utils.email.charitySuggestion({
    ein: ein || '-----',
    email,
    name,
    url: url || '-----',
  });
};
