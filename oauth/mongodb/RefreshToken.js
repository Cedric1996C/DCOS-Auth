'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RefreshTokenSchema = new Schema({
  refresh_token: String,
  expires: Date,
  scope:  String,
  // User:  { type : Schema.Types.ObjectId, ref: 'User' },
  Client: { type : Schema.Types.ObjectId, ref: 'Client' },
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
