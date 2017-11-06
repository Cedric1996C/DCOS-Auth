DCOS-Auth is an OAuth2.0 service provided for DCOS which is developed by React and Flux.

###  Getting Started
#### Downloading
Input this commmand in your terminal
```
git clone git@github.com:RobottDog/DCOS-Auth.git
```
#### Installing
```
cd DCOS-Auth
npm install
```
#### Using it
To initialize the datebase:
```
npm run seed
```
Then
```
npm run start
```

### How it works
#### Configuration
- ./config.js : You can config client,  server,  port,  database, etc.
- ./config/ldapConfig.js: To config the LDAP protocal.

#### Getting AccessToken
Once an accessToken is generated, auth-server will send it both to client and backend server. So,  backend server should provide an API for auth server to post user token.
You should exchange **config.token_destination**  by this API.