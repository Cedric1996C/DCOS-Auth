'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AccessTokenSchema = new Schema({
  access_token: String,
  expires: Date,
  scope:  String,
  User:  { type : Schema.Types.ObjectId, ref: 'User' },
  Client: { type : Schema.Types.ObjectId, ref: 'OAuthClient' },
});

module.exports = mongoose.model('AccessToken', AccessTokenSchema);
