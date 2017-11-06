var express = require('express');
var router = express.Router();
var path = require('path');

var oauth = require('../oauth');

/* POST accessToken. */
router.post('/', function(req, res, next){
	oauth.tokenHandler(req, res)
})

module.exports = router;
