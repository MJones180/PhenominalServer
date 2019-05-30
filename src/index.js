const { GraphQLServer } = require('graphql-yoga');
const { formatError } = require('apollo-errors');
const { Prisma: PrismaBinding } = require('prisma-binding');
const { prisma: client } = require('./generated/prisma-client');
const user = require('./middleware/user');
const aws = require('./utils/aws');
const dots = require('./utils/dots');
const email = require('./utils/email');
const loops = require('./utils/loops');
const halos = require('./utils/halos');
const providers = require('./utils/providers');
const errors = require('./utils/errors');
const loopStage = require('./utils/loopStage');
const rand = require('./utils/rand');
const token = require('./utils/token');
const wait = require('./utils/wait');
const resolvers = require('./resolvers');

const binding = new PrismaBinding({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
});

// Server config
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    binding,
    client,
    utils: {
      aws,
      dots: dots(client),
      email,
      loops: loops(client),
      halos: halos(binding, client),
      providers,
      errors,
      loopStage,
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

// Check if in prod env
const __PROD__ = (process.env.STAGE) == 'prod';

// Hide the playground in production
if (__PROD__) options.playground = false;

// Server's URL
const serverURL = __PROD__ ? 'https://server.phenominal.fund' : 'http://localhost:4000';

// Start the server
server.start(options, () => console.log(`Server is running on ${serverURL}`));
