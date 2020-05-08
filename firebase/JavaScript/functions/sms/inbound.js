const functions = require('firebase-functions');
const nexmo = require('../nexmo-conifg');
const { PubSub } = require('@google-cloud/pubsub');

function sendSMS(from, to, content) {
  return new Promise((resolve, reject) => {
    nexmo.message.sendSms(from, to, content, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

exports.webhook = functions.https.onRequest(async (req, res) => {
  const pubSubClient = new PubSub();
  let data = req.body;
  let dataBuffer = Buffer.from(JSON.stringify(data));
  // check SMS keyword and publish topic
  switch (data.keyword.toLowerCase()) {
    case "hello":
      await pubSubClient.topic('hello').publish(dataBuffer);
      break;
    case "ping":
      await pubSubClient.topic('ping').publish(dataBuffer);
      break;
    default:
      break;
  }

  res.sendStatus(200);
});

exports.hello = functions.pubsub.topic('hello').onPublish(async (buf) => {
  let { msisdn, to } = buf.json;
  await sendSMS(to, msisdn,"World!")
  return;
});

exports.ping = functions.pubsub.topic('ping').onPublish(async (buf) => {
  let { msisdn, to } = buf.json;
  await sendSMS(to, msisdn, "Pong");
  return;
});