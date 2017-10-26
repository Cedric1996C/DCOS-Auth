var express = require('express');
var router = express.Router();

const oauth = require('../oauth');

router.get('/', function(req, res, next){
	oauth.authorizeHandler(req, res);
});

module.exports = router;