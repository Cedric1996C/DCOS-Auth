var express      = require('express'),
    path         = require('path'),
    config       = require('./config')
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: 'ldap://114.212.189.138:389',
    bindDN: 'cn=admin,dc=njuics,dc=cn',
    bindCredentials: 'dr0w55@P#nap',
    searchBase: 'dc=njuics,dc=cn',
    searchFilter: '(uid={{username}})'
  }
};

var app = express();
app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'index.html')))
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'))
})

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  console.log(req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  res.send({status: 'ok'});
});

app.listen(config.LOGINAUTH_PORT);