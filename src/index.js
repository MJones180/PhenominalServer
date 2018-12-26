const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');
const { Prisma: PrismaBinding } = require('prisma-binding');
const user = require('./middleware/user');
const aws = require('./utils/aws');
const email = require('./utils/email');
const errors = require('./utils/errors');
const providers = require('./utils/providers');
const wait = require('./utils/wait');
const rand = require('./utils/rand');
const token = require('./utils/token');
const resolvers = require('./resolvers');

const { prisma: prismaClient } = require('./generated/prisma-client');

// Server config
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    binding: new PrismaBinding({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
    }),
    client: prismaClient,
    utils: {
      aws,
      email,
      errors,
      providers,
      rand,
      token,
      wait,
    },
  }),
  middlewares: [user],
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
