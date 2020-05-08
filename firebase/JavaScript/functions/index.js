const admin = require('firebase-admin');

admin.initializeApp();

exports.sms = require('./sms');
exports.voice = require('./voice');
exports.verify = require('./verify');

