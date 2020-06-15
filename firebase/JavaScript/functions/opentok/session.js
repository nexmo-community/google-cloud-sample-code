const functions = require('firebase-functions');
const admin = require('firebase-admin');
const OpenTok = require('opentok');

const {
  api_key,
  api_secret,
} = functions.config().opentok;

const opentok = new OpenTok(api_key, api_secret);

let db = admin.firestore();

function createSession(opts = {}) {
  return new Promise((resolve, reject) => {
    opentok.createSession(opts, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

exports.method = functions.https.create(async (req, res) => {
  let session = await createSession();
  let ref = await db.collection('opentok-sessions').add(session);
  res.send(200).send({sessionRef: ref.id});
});