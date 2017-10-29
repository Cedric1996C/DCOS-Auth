const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;

const db = require('./mongodb');
const User = db.User;

const oauth = new oauthServer({
	model: require('./models.js'),
	authenticateHandler: {
        handle: function(req, res){
        	// console.log("new handler")
        	return User.findOne({username: req.query.username})
        	.then(function(user){
        		console.log(user)
        		return user
        	})
        	.catch( err => {
        		console.log("Err: find User");
        	})
            // Whatever you need to do to authorize / retrieve your user from post data here
            // return {user: req.query.username};
        }
    },
    allowEmptyState: true,
    accessTokenLifetime: 30 * 24 * 60 * 60,
});

function authorizeHandler(req, res, options) {
	console.log("authorizeHandler: ",req.url);
	let request = new Request(req);
	let response = new Response(res);
	return oauth.authorize(request, response, options)
	  .then(function(code) {
	  	console.log("finish authorization: ",code);
	    // res.locals.oauth = {code: code};
	    res.send({code: code})
	    next();
	  })
	  .catch(function(err) {
	    // handle error condition
	  });
}

function tokenHandler(req, res, options) {
    let request = new Request(req);
    let response = new Response(res);
    return oauth.token(request, response, options)
      .then(function(token) {
        res.locals.oauth = {token: token};
        res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
        res.send(token);
      })
      .catch(function(err) {
        // handle error condition
      });
};

module.exports = {
	authorizeHandler: authorizeHandler,
	tokenHandler: tokenHandler,
};