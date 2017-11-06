const config = require('../../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri = config.mongodbConfig || "mongodb://localhost/dcos-auth"
mongoose.connect(uri, function(err) {
  if (err) return console.log(err);
  console.log('Mongoose Connected');
});

module.exports = {
	AccessToken: require('./AccessToken'),
	AuthorizationCode: require('./AuthorizationCode'),
	Client: require('./Client'),
	RefreshToken: require('./RefreshToken'),
	User: require('./User')
};