const config = require('../../config/mongodbConfig');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, function(err) {
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