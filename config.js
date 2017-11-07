var Config = {
    dcosui_url: 	process.env.DCOSUI_URL || 'http://localhost:4200',
    loginauth_url: 	process.env.LOGINAUTH_URL || 'http://localhost:3000',
    loginauth_port: process.env.LOGINAUTH_PORT || 3000,
    mongodb_url: 	process.env.MONGODB_URL || "mongodb://localhost/dcos-auth",
    root: __dirname,
   	client_id: "dc-njuics-cn",
  	client_secret: "dcos-nap",
  	token_destination: ""
}

module.exports = Config;
