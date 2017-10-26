const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  // console.log(req);
  // var code = codeGenerator(30);
  // client.code = code;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  res.send({ status: 'ok', client: client });
});

module.exports = router;