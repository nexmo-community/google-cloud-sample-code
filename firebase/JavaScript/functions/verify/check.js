const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Nexmo = require('nexmo');

let db = admin.firestore();

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

function verifyCheck(opts) {
  return new Promise((resolve, reject) => {
    nexmo.verify.check(opts, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

exports.method = functions.https.onRequest(async (req, res) => {
  let id = req.body.user_id;
  let opts = {
    request_id: req.body.req_id,
    code: req.body.code
  };

  let verified = await verifyCheck(opts);
  await db.doc(`/userDetails/${id}`).update({ verify_req_id: admin.firestore.FieldValue.delete(), verified: true });
  res.sendStatus(200);
});