const functions = require('firebase-functions');
const Nexmo = require('nexmo');

const {
  api_key,
  api_secret,
  private_key,
  application_id
} = functions.config().nexmo;

// Initialize Nexmo with application credentials
const nexmo = new Nexmo({
  apiKey: api_key,
  apiSecret: api_secret,
  applicationId: application_id,
  privateKey: private_key
});

Object.freeze(nexmo);
module.exports = nexmo