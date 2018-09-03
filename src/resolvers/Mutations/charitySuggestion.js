module.exports = async (parent, { ein, email, name, representative, url }, ctx) => {
  // Send an email to support with the charity suggestion
  ctx.utils.email.charitySuggestion({
    ein: ein || '-----',
    email,
    name,
    representative: representative ? 'True' : 'False',
    url: url || '-----',
  });
};
