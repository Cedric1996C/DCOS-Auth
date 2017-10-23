var express = require('express');
var router = express.Router();
var path = require('path');

var dirname = require('../config').root;
var getAccessToken = require('../lib/getAccessToken');
var client = require('../lib/client');

/* POST accessToken. */
router.post('/', function(req, res, next){
	const token = getAccessToken(req.body);
	if(token){
		client.access_token = token;
	    res.send({
	    	access_token: token,
	    	expire_in: 3600
	    });
	} else {
		res.status(400).send('Bad Request');
	}
})

module.exports = router;
