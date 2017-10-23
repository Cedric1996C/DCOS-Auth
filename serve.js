var express      = require('express'),
    path         = require('path'),
    config       = require('./config')
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth'),
    LdapConfig   = require('./config/ldapConfig'),
    cors         = require('cors');
var index = require('./routes/index');
var codeGenerator = require('./lib/codeGenerator');
var client = require('./lib/client');
var access = require('./routes/access');

var app = express();
app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'index.html')))

passport.use(new LdapStrategy(LdapConfig));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.use('/',index);
app.use('/access',access);

app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  // console.log(req);
  var code = codeGenerator(30);
  client.code = code;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  res.send({ status: 'ok', client: client });
});

app.listen(config.LOGINAUTH_PORT);