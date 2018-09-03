const moment = require('moment');
const assign = require('lodash/assign');
const mailjet = require('node-mailjet')
  .connect(process.env.MAILJET_KEY, process.env.MAILJET_SECRET);

module.exports = ({ email, name, subject, template, variables }) => {
  // The send config
  mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [{
        From: {
          Email: 'team@phenominal.fund',
          Name: 'Phenominal',
        },
        Subject: subject,
        TemplateErrorDeliver: true,
        TemplateErrorReporting: {
          Email: 'team@phenominal.fund',
          Name: 'Template error',
        },
        TemplateID: template,
        TemplateLanguage: true,
        To: [{
          Email: email,
          Name: name,
        }],
        Variables: assign({
          date: moment().format('MMMM Do, YYYY'),
        }, variables),
      }],
    });
};
