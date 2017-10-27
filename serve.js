var express      = require('express'),
    path         = require('path'),
    config       = require('./config')
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth'),
    LdapConfig   = require('./config/ldapConfig'),
    cors         = require('cors'),
    OAuthServer  = require('express-oauth-server');

var index = require('./routes/index');
var oauth = require('./routes/oauth');
var authorize = require('./routes/authorize');
// var login = require('./routes/login');

var app = express();
app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'index.html')))

passport.use(new LdapStrategy(LdapConfig));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use('/',index);
app.use('/oauth',cors(corsOptionsDelegate),oauth);
// app.use('/login',login);
app.use('/authorize',authorize);

app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  // console.log(req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  res.send({ status: 'ok' });
});

app.listen(config.LOGINAUTH_PORT);