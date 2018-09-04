const { env } = require('minimist')(process.argv.slice(2));
require('dotenv').config({ path: `${process.cwd()}/.env.shared` });
if (env == 'dev') require('dotenv').config({ path: `${process.cwd()}/.env.dev` });
if (env == 'prod') require('dotenv').config({ path: `${process.cwd()}/.env.prod` });
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
      'http://localhost:3000',
      'https://phenominal.fund',
      'https://phenominal.netlify.com',
    ],
  },
  formatError,
};

if (env == 'prod') options.playground = false;

server.start(options, () => console.log('Server is running on http://localhost:4000'));
