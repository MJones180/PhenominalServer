const minimist = require('minimist');
const dotenv = require('dotenv');

// Load in the CLI params
const { path, prod } = minimist(process.argv.slice(2));

// Set env variables from a file
const env = path => dotenv.config({ path: `${process.cwd()}/env/${path}` });

// Shared env variables
env('.root');
// Stage dependent env variables
env(`.${prod ? 'prod' : 'dev'}`);

// Load the requested file
require(path);
