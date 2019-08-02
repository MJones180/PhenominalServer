// =============================
// Cron to email that funds will
// be auto donated in 1 week
// =============================

const { CronJob } = require('cron');
const each = require('lodash/each');

module.exports = (binding, sendEmail) => {
  const upcomingExpiredFunds = async () => {
    // Format console logs
    const log = text => console.log(`[Cron] ${text}`);
    // Alert that the process has started
    log(new Date().toISOString());
    log('Executing upcomingExpiredFunds');
    // The date constraint for the charges
    const dateDaysAgo = (x) => {
      const date = new Date();
      // Set the current date back by x days
      date.setDate(date.getDate() - x);
      // Convert to ISO string
      return date.toISOString();
    };
    // The date for when the funds will expire
    const date1WeekAhead = () => {
      const date = new Date();
      // Set the current date ahead 7 days
      date.setDate(date.getDate() + 7);
      // Convert to ISO string
      return date.toISOString();
    };
    // Grab all of the charges that are going to expire in 1 week
    const charges = await binding.query.charges({
      where: {
        createdAt_lte: dateDaysAgo(73),
        createdAt_gt: dateDaysAgo(74),
        donations_every: { chargeBalance_gt: 0 },
      },
    }, `{
      id
      amountNet
      donations(first: 1, orderBy: createdAt_DESC) {
        chargeBalance
      }
      user {
        email
        nameFirst
        nameLast
      }
    }`);
    // There is at least one charge that is about to expire
    if (charges.length) {
      log('Charges:');
      // Have an email alert sent for each of the charges
      each(charges, async ({ amountNet, donations, id: sourceID, user: { email, nameFirst, nameLast } }) => {
        // Log the charge's ID
        log(`- ${sourceID}`);
        // Amount of the source funds left
        const amount = donations.length ? donations[0].chargeBalance : amountNet;
        // Send an email that the funds will be automatically donated
        sendEmail.upcomingExpiredFunds({ amount, expirationDate: date1WeekAhead() }, email, nameFirst, nameLast);
      });
    } else log('No Charges');
  };
  // Run script at 12:30AM everyday
  new CronJob('00 30 00 * * *', upcomingExpiredFunds).start();
};
