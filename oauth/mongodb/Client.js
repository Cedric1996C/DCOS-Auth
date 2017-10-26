'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name:  String,
  client_id:  String,
  client_secret: String,
  redirect_uri: String,
  grant_types: String,
  scope: String,
  User:  { type : Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Client', ClientSchema);

