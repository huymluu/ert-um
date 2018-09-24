module.exports = {
  server: {
    env: process.env.NODE_ENV || 'production',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
    serveWeb: process.env.SERVE_WEB || 'true',
    log: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    },
    oauth: {
      authorize_url: 'http://localhost:7000/dialog/authorize',
      token_url: 'http://localhost:7000/oauth/token',
      client_id: 'abc123',
      client_secret: 'ssh-secret',
      redirect_uri: 'http://localhost:8000/oauth/authorized',
    }
  },
  web: {
    env: process.env.NODE_ENV || 'production',
    apiUrl: process.env.SERVE_WEB === 'true' ? 'http://localhost:7000/api' : process.env.REMOTE_API_URL || 'http://localhost:7000/api'
  }
}