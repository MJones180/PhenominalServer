const chalk = require('chalk');
const each = require('async/each');
const forEach = require('lodash/forEach');
const jsonfile = require('jsonfile');
const { prisma } = require('../../src/generated/prisma-client');

// The source file
const source = `${__dirname}/${process.env.STAGE}.json`;

// Grab the events
const events = jsonfile.readFileSync(source);

// Add a new charity event to the db
const createCharity = async ({
  endDate, goal, startDate, ein,
}) => (
  prisma.createEvent({
    endDate,
    goal,
    startDate,
    charity: {
      connect: {
        ein,
      },
    },
  })
);

// Log the changes made
const log = (action, events) => {
  console.log(action);
  // Loop through all of the events' EINs
  forEach(events, ein => (
    console.log(`\t${chalk.bold(ein)}`)
  ));
};

// Reset the file to a default template
const reset = () => {
  // Grab the base template
  const { template } = jsonfile.readFileSync(`${__dirname}/template.json`);
  // Overwrite the base template to the source
  jsonfile.writeFileSync(source, template, { spaces: 2 });
};

// Handle adding events
const push = async () => {
  const pushed = [];
  // Loop through each of the events to add
  each(events.charities, (data, done) => {
    // Ensure an actual value exists, not an empty one
    if (data.ein != '') {
      // Add the event to the db
      createCharity({ ...data });
      pushed.push(data.ein);
    }
    // End the iteration
    done();
  }, () => {
    // Log all changes
    log('Pushed charities:', pushed);
  });
};

// Add all events to the database
push();

// Reset the source file
reset();
