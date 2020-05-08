const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Nexmo = require('nexmo');
const fs = require('fs')

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

// creates promise for nexmo.files.save
function saveFile(url, file) {
  return new Promise((resolve, reject) => {
    nexmo.files.save(url, `/tmp/${file}.mp3`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

// Answers the inbound call and connects to the associated number in the Firestore collection.
exports.webhook = functions.https.onRequest(async (req, res) => {
  // the "to" property from Vonage API is the virtual number that is being called.
  const { to: from_number } = req.body;

  // look up the number associated to the virtual number in the collection "phone-lookup"
  let lookup = await admin.firestore().doc(`/phone-lookup/${from_number}`).get();

  let { protocol, hostname, baseUrl } = req;
  // this is a basic NCCO object to connect the caller with the proxied number and record the phone call
  const ncco = [
    {
      "action": "record",
      "eventUrl": [`${protocol}://${hostname}${baseUrl.substr(0, baseUrl.lastIndexOf('/'))}/voice-answer-logcall`]
    },
    {
      action: 'connect',
      from: from_number,
      endpoint: [{
        type: 'phone',
        number: lookup.data().phoneNumber
      }]
    }
  ];

  // returns the NCCO object to Vonage Voice API. 
  res.status(200).send(ncco);
});

exports.logcall = functions.https.onRequest(async (req, res) => {
  let { recording_url, conversation_uuid, recording_uuid, start_time, end_time } = req.body;
  // Download temporary file from Vonage API
  let filePath = await saveFile(recording_url, conversation_uuid);

  // initialize Default Firebase Storage - modify the bucket location to be more specific
  const bucket = admin.storage().bucket();

  // create custom metadata for future reference of the recording
  let metadata = {
    'metadata': {
      'start_time': start_time,
      'end_time': end_time,
      'uuid': recording_uuid
    }
  }

  // upload file to storage
  await bucket.upload(filePath, {
    destination: `recordings/${filePath.substr(filePath.lastIndexOf('/') + 1)}`,
    metadata: metadata,
  });

  // finally, delete the temp file from server
  fs.unlinkSync(filePath);

  res.sendStatus(200)
});


