const chalk = require('chalk');
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

console.log('Pushed charities:');

// Loop through each of the events to add
forEach(events.charities, (data) => {
  // Ensure an actual value exists, not an empty one
  if (data.ein != '') {
    // Add the event to the db
    createCharity({ ...data });
    console.log(`\t${chalk.bold(data.ein)}`);
  }
});

// Reset the file to a default template
const reset = () => {
  // Grab the base template
  const { template } = jsonfile.readFileSync(`${__dirname}/template.json`);
  // Overwrite the base template to the source
  jsonfile.writeFileSync(source, template, { spaces: 2 });
};

// Reset the source file
reset();
