var client = require('./client');

module.exports = function(len) {
    var code = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    return code;
}
