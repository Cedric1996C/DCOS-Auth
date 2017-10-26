const mongodb = require('./mongodb');
const AuthorizationCode = mongodb.AuthorizationCode;
const Client = mongodb.Client;
const AccessToken = mongodb.AccessToken;
const RefreshToken = mongodb.RefreshToken;
const User = mongodb.User;
const Scope = mongodb.Scope;

function getAccessToken(bearerToken){
	console.log("getAccessToken",bearerToken)
  return AccessToken
  //User,OAuthClient
    .findOne({access_token: bearerToken})
    .populate('User')
    .populate('Client')
    .then(function (accessToken) {
      console.log('at',accessToken)
      if (!accessToken) return false;
      var token = accessToken;
      token.accessToken = bearerToken;
      token.user = token.User;
      token.client = token.Client;
      token.scope = token.scope
      return token;
    })
    .catch(function (err) {
      console.log("getAccessToken - Err: ")
    });
}

function getAuthorizationCode(code){
	console.log('getAuthorizationCode:',code);
	return AuthorizationCode
		.findOne({authorization_code: code})
    .populate('User')
    .populate('Client')
    .then(function (authCodeModel) {
      if (!authCodeModel) return false;
      console.log(authCodeModel)
      var client = authCodeModel.Client
      var user = authCodeModel.User
      return reCode = {
        authorizationCode: code,
        expiresAt: authCodeModel.expires,
        redirectUri: client.redirect_uri,
        user: user,
        client: client,
        scope: authCodeModel.scope
      };
    }).catch(function (err) {
      console.log("getAuthorizationCode - Err: ", err)
    });
}

function getClient(client, secret){
	console.log("getClient: ",client,secret);
	const options = { 
		client_id: client
	};
	return Client
    .findOne(options)
    .then(function (client) {
      if (!client) return new Error("client not found");
      const rClient = {
      	id: client.id,
      	grants: ["authorization_code"],
      	redirectUris: [client.redirect_uri]
      };
      return rClient;
    }).catch(function (err) {
      console.log("getClient - Err: ", err)
    });
}

function getUser(username) {
  return User
    .findOne({username: username})
    .then(function (user) {
      console.log("user: ",user)
      return user;
    })
    .catch(function (err) {
      console.log("getUser - Err: ", err)
    });
}

function saveToken(token, client, user){
	console.log("saveToken: ",token, client, user)
  return Promise.all([
      AccessToken.create({
        access_token: token.accessToken,
        expires: token.accessTokenExpiresAt,
        Client: client._id,
        User: user._id,
        scope: token.scope
      }),
      token.refreshToken ? RefreshToken.create({ // no refresh token for client_credentials
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        Client: client._id,
        User: user._id,
        scope: token.scope
      }) : [],

    ])
    .then(function(resultsArray) {
      // console.log("resultsArray:",resultsArray)
      // console.log("token:",token)
      var nToken = Object.assign(  // expected to return client and user, but not returning
        {
          client: client,
          user: user,
          // access_token: token.accessToken, // proxy
          // refresh_token: token.refreshToken, // proxy
        },
        token
      )
      console.log(nToken)
      return nToken
    })
    .catch(function (err) {
      console.log("revokeToken - Err: ", err)
    });
}

function saveAuthorizationCode(code, client, user){
	return AuthorizationCode
    .create({
  	  authorization_code: code.authorizationCode,
      expires: code.expiresAt,
      redirect_uri: code.redirect_uri,
      Client: client.id,
      User: user.id,
      scope: code.scope
    })
    .then(function () {
      return {
      	authorizationCode: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        scope: code.scope,
      	client: client,
      	user: user
      }
    }).catch(function (err) {
      console.log("saveAuthorizationCode - Err: ", err)
    });
}

function revokeAuthorizationCode(code){
	console.log("revokeAuthorizationCode",code)
	  return AuthorizationCode
	  .findOne({ authorization_code: code.authorizationCode })
	  .then(function (rCode) {
	  	console.log("result:",rCode);
	    return rCode ? true:false;
	  }).catch(function (err) {
	    console.log("getUser - Err: ", err)
	  });
};

function validateScope(token, client, scope){
	console.log("verifyScope", token, scope)
  return token.scope === scope
}

module.exports = {
	getAccessToken: getAccessToken,
	getAuthorizationCode: getAuthorizationCode,
	getClient: getClient,
	getUser: getUser,
	saveToken: saveToken,
	saveAuthorizationCode: saveAuthorizationCode,
	revokeAuthorizationCode: revokeAuthorizationCode,
	validateScope: validateScope
};