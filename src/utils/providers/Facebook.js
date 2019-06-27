const graph = require('fbgraph');

module.exports = (token, cb) => {
  // Facebook access token and app secret
  graph.setAccessToken(token);
  graph.setAppSecret(process.env.FACEBOOK_SECRET);
  // Graph version to use
  graph.setVersion('3.3');
  // Fields that need to be returned
  const fields = [
    'email',
    'id',
    'first_name',
    'last_name',
  ].toString();
  // Call the endpoint
  graph.get('me', { fields }, (err, data) => {
    cb({
      email: data.email,
      nameFirst: data.first_name,
      nameLast: data.last_name,
      providerID: data.id,
    });
  });
};
