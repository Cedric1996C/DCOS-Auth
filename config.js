var Config = {
    // DCOSUI_URL: 'https://dc.njuics.cn',
    // LOGINAUTH_URL: 'http://114.212.189.147:3000',
    DCOSUI_URL: 'http://localhost:4200',
    LOGINAUTH_URL: 'http://localhost:3000',
    LOGINAUTH_PORT: 3000,
    root: __dirname,
   	client_id: "dc-njuics-cn",
  	client_secret: "dcos-nap",
  	mongodbConfig: "mongodb://localhost/dcos-auth",
  	token_destination: ""
}

module.exports = Config;
