const { formatError } = require('apollo-errors');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { importSchema } = require('graphql-import');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLUpload } = require('graphql-upload');
const { Prisma: PrismaBinding } = require('prisma-binding');
const { prisma: client } = require('./generated/prisma-client');
const handleExpiredFunds = require('./cron/handleExpiredFunds');
const upcomingExpiredFunds = require('./cron/upcomingExpiredFunds');
const user = require('./middleware/user');
const resolvers = require('./resolvers');
const aws = require('./utils/aws');
const currentAuthCharity = require('./utils/currentAuthCharity');
const dots = require('./utils/dots');
const email = require('./utils/email');
const errors = require('./utils/errors');
const grabEvents = require('./utils/grabEvents');
const halos = require('./utils/halos');
const loops = require('./utils/loops');
const loopStage = require('./utils/loopStage');
const providers = require('./utils/providers');
const rand = require('./utils/rand');
const stripe = require('./utils/stripe');
const token = require('./utils/token');
const uploadPicture = require('./utils/uploadPicture');
const wait = require('./utils/wait');
const connectWebhook = require('./webhooks/connect');
const disputesWebhook = require('./webhooks/disputes');

// List of middlewards, applied in order given
const middlewares = [user];

// The final schema with the middlewares attached
const schema = applyMiddleware(
  // Generate the schema, used for all queries and mutation
  makeExecutableSchema({
    // Import the definitions
    typeDefs: importSchema('src/schema.graphql'),
    // Include the Upload type for file uploads along with the normal resolvers
    resolvers: [{ Upload: GraphQLUpload }, resolvers],
    // Disable node error generated on each start
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  }),
  ...middlewares
);

// Check if in dev env
const __DEV__ = (process.env.STAGE) == 'dev';

// The Prisma binding config
const binding = new PrismaBinding({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
});

// The GraphQL server
const server = new ApolloServer({
  context: req => ({
    ...req,
    binding,
    client,
    utils: {
      aws,
      currentAuthCharity: currentAuthCharity(binding),
      dots: dots(client),
      email,
      errors,
      grabEvents: grabEvents(binding),
      halos: halos(binding, client),
      loops: loops(client),
      loopStage,
      providers,
      rand,
      stripe,
      token,
      uploadPicture,
      wait,
    },
  }),
  // Only enable debug in dev
  debug: __DEV__,
  formatError,
  schema,
});

// The Express app
const app = express();

// Whitelisted URLs
const origin = ['https://phenominal.fund'];
// Allow `localhost` in dev
if (__DEV__) origin.push('https://localhost:3000');

// Attach Express to the Apollo GraphQL server
server.applyMiddleware({
  app,
  // Only allow requests from Phenominal
  cors: { origin },
});

// Webhook endpoints
app.post('/webhook/connect', connectWebhook(email, stripe));
app.post('/webhook/disputes', disputesWebhook(email, stripe));

// Cron jobs
handleExpiredFunds(binding, client, email, grabEvents(binding), stripe);
upcomingExpiredFunds(binding, email);

// Server's URL
const serverURL = __DEV__ ? 'http://localhost:4000' : 'https://server.phenominal.fund';

// Use Heroku port or 4000 in dev
const port = process.env.PORT || 4000;

// Listen for requests
app.listen({ port }, () => console.log(`Server is running on ${serverURL}`));
