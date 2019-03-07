const _ = require('lodash');
const chalk = require('chalk');
const async_each = require('async/each');
const forEach = require('lodash/forEach');
const includes = require('lodash/includes');
const isEqual = require('lodash/isEqual');
const keyBy = require('lodash/keyBy');
const keys = require('lodash/keys');
const jsonfile = require('jsonfile');
const { prisma } = require('../../src/generated/prisma-client');

// Grab the source file with all of the charities
const source = jsonfile.readFileSync(`${__dirname}/index.json`);

// Grab all of the current charities in the db
const grabPushed = async () => {
  const charitiesRaw = await prisma.charities();
  // Remove all database specific fields
  const charities = _.map(charitiesRaw, ({ id, createdAt, updatedAt, ...data }) => data);
  // Format all charities so they are indexed by their EINs
  // Ex: { [ein]: { ...data } }
  return keyBy(charities, ({ ein }) => ein);
};

// Add a new charity to the db
const create = async data => prisma.createCharity({ ...data });

// Update an existing charity in the db
const update = async ({ ein, ...data }) => (
  prisma.updateCharity({
    data,
    where: {
      ein,
    },
  })
);

// Log the changes made
const log = (action, charities) => {
  console.log(action);
  // Loop through all of the charities' EINs
  forEach(charities, ein => (
    console.log(`\t${chalk.bold(ein)}`)
  ));
};

const sync = async () => {
  const created = [];
  const updated = [];
  // Grab all charities from the db
  const pushed = await grabPushed();
  // Create a list of EINs from the charities within the db
  const pushedEINs = keys(pushed);
  // Loop through each charity in the source file
  async_each(source, (data, done) => {
    const { ein } = data;
    // If the charity is not already in the db then push it
    const unpushed = !includes(pushedEINs, ein);
    // If the charity's data has been changed then update it in the db
    const changed = !isEqual(data, pushed[ein]);
    if (unpushed) {
      // Push the charity and log it
      create(data);
      created.push(ein);
    } else if (changed) {
      // Update the charity and log it
      update(data);
      updated.push(ein);
    }
    // End the iteration
    done();
  }, () => {
    // Log all changes
    log('Created:', created);
    log('Updated:', updated);
  });
};

// Print the current env
console.log('\nENV: ', process.env.STAGE);

// Sync the database to the index.json
sync();
