const minimist = require('minimist');
const dotenv = require('dotenv');

// Grab the script's arguments
const { env, script } = minimist(process.argv.slice(2));

// Set the environment variables
dotenv.config({ path: `${process.cwd()}/.env.shared` });
if (env == 'prod') {
  dotenv.config({ path: `${process.cwd()}/.env.prod` });
  process.env.__PROD__ = true;
} else {
  dotenv.config({ path: `${process.cwd()}/.env.dev` });
  process.env.__DEV__ = true;
}

// Run the correct script
if (script == 'pushEvents') require('./database/events/push.js');
if (script == 'start') require('./src/index.js');
if (script == 'syncCharities') require('./database/charities/sync.js');
