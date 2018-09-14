# ERT User Management App

ERT User Management App is a web application to manage (create/edit) user info in ERT system.

Firstly, ERT Management App must be authorized by user via [ERT OAuth Server](https://github.com/huymluu/ert-auth).  
Then, user can use ERT User Management App to manage data in ERT system.

## As an OAuth client

ERT User Management App is an OAuth client with configuration:
```
client_id:     'abc123'
client_secret: 'ssh-secret'
```

For simplicity, its info is already registered with ERT OAuth Server.

## Authorization flow

![](docs/authorization-flow.png)

## Configuration

Please see `./config/default.js`. Some main configurations:
```
Webapp port:         8000
OAuth authorize_url: http://localhost:7000/dialog/authorize
OAuth token_url:     http://localhost:7000/oauth/token
OAuth client_id:     abc123
OAuth client_secret: ssh-secret
OAuth redirect_uri:  http://localhost:8000/oauth/authorized
API url:             http://localhost:7000/api
```

## Usage

### For development
```
npm install
npm run dev
```

### For production (run in host)

```
npm start
```

### For production (dockerize)

```
docker-compose up -d
```