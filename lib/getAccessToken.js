const client = require('./client');
const codeGenerator = require('./codeGenerator');
const querystring = require('querystring');

module.exports = function(data) { 
	var token = null;
	console.log(client);
	console.log(data);
	if(data.clientId==client.clientId && data.secret==client.secret && data.code==client.code){
		token = codeGenerator(30);
	}
	// console.log(judge);
	return token;
}