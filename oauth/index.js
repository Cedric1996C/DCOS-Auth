const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;
// const db = require('./mongodb');
const oauth = new oauthServer({
	model: require('./models.js'),
	authenticateHandler: {
        handle: (req, res) => {
        	// console.log("new handler")
            // Whatever you need to do to authorize / retrieve your user from post data here
            return {user: "new user"};
        }
    },
    allowEmptyState: true,
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


module.exports = {
	authorizeHandler: authorizeHandler,
};