'use strict';
var mongodb = require('./mongodb');
var config = require('../config');
// var Thing = mongodb.Thing;
var AccessToken = mongodb.AccessToken
var AuthorizationCode = mongodb.AuthorizationCode
var Client = mongodb.Client
var RefreshToken = mongodb.RefreshToken
// var Scope = mongodb.Scope
var User = mongodb.User


User.find({}).remove()
  .then(function() {
    Client.find({}).remove()
      .then(function() {
        Client.create({
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: config.dcosui_url
          })
          .then(function(client) {
            console.log('finished populating Client',client);
          }).catch(console.log);
    });
});