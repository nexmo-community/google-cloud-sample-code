const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Nexmo = require('nexmo');
const fs = require('fs')

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

function verifyRequest(opts) {
  return new Promise((resolve, reject) => {
    nexmo.verify.request(opts, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

exports.method = functions.firestore.document('/userDetails/{id}')
  .onWrite(async (change, context) => {
    let doc = change.after;
    if (!doc.data().phone || doc.data().verify_req_id || doc.data().verified) return;
    let opts = {
      number: doc.data().phone,
      brand: 'Vonage Verify',
      workflow_id: 6,
      pin_expiry: 120
    };

    let res = await verifyRequest(opts);
    db.doc(`/userDetails/${context.params.id}`).update({ verify_req_id: res.request_id });
  });

