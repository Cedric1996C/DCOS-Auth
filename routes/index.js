var express = require('express');
var router = express.Router();
var path = require('path');

var dirname = require('../config').root;
var authorize = require('../lib/authorize');
var codeGenerator = require('../lib/codeGenerator');

/* GET home page. */
router.get('/',function(req, res, next){
	console.log(req.url);
	authorize(req.url);
	next();
})

router.get('/', function(req, res, next){
    res.sendFile(path.join(dirname, 'index.html'));
    // next();
})

// router.get('/',codeGenerator);

router.post('/', function(req, res, next){
    res.sendFile(path.join(dirname, 'index.html'))
})

module.exports = router;
