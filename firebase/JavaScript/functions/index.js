const admin = require('firebase-admin');

admin.initializeApp();

exports.voice = require('./voice');

