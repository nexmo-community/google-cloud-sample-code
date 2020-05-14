const admin = require('firebase-admin');

admin.initializeApp();

exports.messaging = require('./messaging');
exports.sms = require('./sms');
exports.voice = require('./voice');
exports.verify = require('./verify');

