const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:28692';

const PROXY_CONFIG = [
  {
    context: [
      "/**",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;

/*
{
  "/api/**": {
    "target": "http://cn0005s21w10274:5211/",
      "secure": false,
        "changeOrigin": true,
          "logLevel": "debug"
  }

}*/
