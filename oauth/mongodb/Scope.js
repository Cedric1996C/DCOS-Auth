'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ScopeSchema = new Schema({
  scope:  String,
  is_default: Boolean
});

module.exports = mongoose.model('Scope', ScopeSchema);
