const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');
const prisma = require('../prismaStart');
const grabUser = require('./utils/grabUser');
const email = require('./utils/email');
const errors = require('./utils/errors');
const providers = require('./utils/providers');
const token = require('./utils/token');
const resolvers = require('./resolvers');

// Server config
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    db: prisma(true),
    resolvers,
    user: grabUser(req, errors),
    utils: {
      email,
      errors,
      providers,
      token,
    },
  }),
});

// Server options
const options = {
  cors: {
    origin: [
      'https://localhost:3000',
      'https://phenominal.fund',
      'https://phenominal.netlify.com',
    ],
  },
  formatError,
};

// Check if in production
const { __PROD__ } = process.env;

// Hide the playground in production
if (__PROD__) options.playground = false;

// Server's URL
const serverURL = __PROD__ ? 'https://server.phenominal.fund' : 'http://localhost:4000';

// Start the server
server.start(options, () => console.log(`Server is running on ${serverURL}`));
