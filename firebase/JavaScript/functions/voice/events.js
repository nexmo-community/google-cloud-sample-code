const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();
// const rtdb = admin.database();
// var ref = db.ref("server/saving-data/fireblog");

exports.webhook = functions.https.onRequest(async (req, res) => {
  let data = req.body;
  // check event status to determine what to do
  switch (data.status) {
    case "started":
      console.log("CALL STARTED");
      delete data.headers;
      // await db.collection('call-log').doc(data.uuid).set(data);
      break;
    case "ringing":
      console.log("CALL RINGING");
      break;
    case "answered":
      console.log("CALL RINGING");
      break;
    default:
      break;
  }
  // started
  // ringing
  // answered
  // busy
  // cancelled
  // unanswered
  // disconnected
  // rejected
  // failed
  // human / machine
  // timeout
  // completed
  // record
  // input
  // transfer
  // await db.collection('call-log').doc(sample.recording_uuid).set(sample);
  res.sendStatus(200);
});
