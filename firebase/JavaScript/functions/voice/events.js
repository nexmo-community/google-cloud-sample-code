const functions = require('firebase-functions');

exports.webhook = functions.https.onRequest(async (req, res) => {
  res.sendStatus(200);
});
