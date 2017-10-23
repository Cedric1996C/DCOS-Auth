var authorizeConfig = require('../config/authorizeConfig');
var config = require('../config');
var constant = require('./client');
var { URL } = require('url');

module.exports = function(url){
	var client = new URL(url, config.LOGINAUTH_URL);
	constant.clientId = client.searchParams.get('client_id');
	constant.redirectUrl = client.searchParams.get('redirect_url');
	// console.log(constant);
}