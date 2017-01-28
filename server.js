'use strict';

import config from './lib/configManager.js';
import winston from 'winston';
import path from 'path';

import express from 'express';
import http from 'http';

//to parse POST, PUT, DELETE, PATCH body
import bodyParser from 'body-parser';

//to comprese response to save bandwith
import compression from 'compression'


import expressPromiseRouter from 'express-promise-router';


//proper session implementation
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import connectRedis from 'connect-redis'
//redis database
import redis from './lib/redisManager.js';

// "protection" middlewares :-)
import helmet from 'helmet';
import hpp from 'hpp';
import csp from 'helmet-csp';

//error reporting middleware
import raven from 'raven';


// import csvimport from './config/import';
import { routes } from './routes/v2';

const app = express();

winston.cli();
if (config.ENV === 'development') {
  winston.level = 'silly';
} else {
  winston.level = 'info';
}


winston.info("Running on %s environment", config.ENV);


app.use(raven.middleware.express.requestHandler(config.ravenMiddleWareUri));
app.use(compression());

//see https://www.npmjs.com/package/helmet
//we add headers that improve security here
app.use(helmet());
app.use(helmet.referrerPolicy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());
//not sure about it
app.use(helmet.hpkp({
  maxAge: 24 * 60 * 60,
  sha256s: ['AbCdEfSeTyLBvTjEOhGD1627853=', 'ZyXwYuBdQsPIUVxNGRDAKGgxhJVu456=']
}));


//see https://www.npmjs.com/package/helmet-csp
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"]
  }
}));


//we parse POST, PUT, DELETE, PATCH body here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//https://www.npmjs.com/package/hpp
app.use(hpp());


//why????
// var MAX_CONTENT_LENGTH_ACCEPTED = 9999;
// app.use(expressContentLength.validateMax({
//   max: MAX_CONTENT_LENGTH_ACCEPTED,
//   status: 400,
//   message: "stop max size for the content-length!"
// })); // max size accepted for the content-length


//setup redis powered sessions
//https://github.com/vodolaz095/hunt/blob/master/lib/http/expressApp.js#L236-L244
const RedisSessionStore = connectRedis(expressSession);
app.use(cookieParser(config.secret));
app.use(expressSession({
  key: 'PHPSESSID', //LOL
  store: new RedisSessionStore({
    prefix: 'starlight_session_',
    client: redis
  }),
  expireAfterSeconds: 3 * 60 * 60, //3 hours
  secret: config.secret,
  httpOnly: true,
  resave: true,
  saveUninitialized: true
}));


app.use(function (req, res, next) {
  res.set(`X-Powered-By`, `TacticalMastery`);
  next();
});

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.sendFile(path.join('public','index.html'));
});

// route with appropriate version prefix
Object.keys(routes).forEach(r => {
  const router = expressPromiseRouter();
  // pass promise route to route assigner
  routes[r](router);
  app.use(`/api/${r}`, router);
});

app.use(raven.middleware.express.errorHandler(config.ravenMiddleWareUri));

//creepy error handler
app.use(function (err, req, res, next) {
  if (err) {
    winston.error(err);
    if (typeof err.status != "undefined") res.status(err.status);
    res.error(err.message || err);
  }
});

//for unit tests
module.exports = exports = app;

//actually start application
if (!module.parent) {
  http
    .createServer(app)
    .listen(config.PORT, config.HOST, function (error) {
      if (error) {
        throw error
      }
      winston.info('Application is listening on %s:%s port', config.HOST, config.PORT);
    });
}
