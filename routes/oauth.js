var express = require('express');
var router = express.Router();
var path = require('path');

var dirname = require('../config').root;
var oauth = require('../oauth');

/* POST accessToken. */
router.post('/', function(req, res, next){
	console.log("good post")
	oauth.tokenHandler(req, res);
})

module.exports = router;
