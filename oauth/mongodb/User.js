const mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

const UserSchema = new Schema({
  username:  String,
  scope: String
});

module.exports = mongoose.model('User', UserSchema);

