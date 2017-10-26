'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AuthorizationCodeSchema = new Schema({
  authorization_code: String,
  expires: Date,
  redirect_uri:  String,
  scope:  String,
  User:  { type : Schema.Types.ObjectId, ref: 'User' },
  Client: { type : Schema.Types.ObjectId, ref: 'Client' },
});

module.exports = mongoose.model('AuthorizationCode', AuthorizationCodeSchema);

