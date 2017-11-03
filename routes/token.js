var express = require('express');
var router = express.Router();
var path = require('path');

var oauth = require('../oauth');

/* POST accessToken. */
router.get('/', function(req, res, next){
	const token = oauth.getUserToken(req, res);
	res.send({token: token});
})

module.exports = router;
