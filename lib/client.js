const config = require('../config');

// wait for annotation
var client = {
	clientId:  config.clientId,
	secret: config.secret
};

module.exports = client;