var express = require('express');
var router = express.Router();

const oauth = require('../oauth');

router.post('/', function(req, res, next){
	next();
});

router.get('/', function(req, res, next){
    // console.log("good get")
	oauth.authorizeHandler(req, res);
});

module.exports = router;