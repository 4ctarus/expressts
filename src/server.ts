import config from './config/config';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import eJwt from 'express-jwt';

import logger from './utils/logger';
import { Limiter } from './utils/limiter';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(helmet());
// --------------------------------- route limiter
app.use('/', Limiter.getLimiter());
// --------------------------------- route
const auth = eJwt({
  secret: config.cert.public,
  requestProperty: 'jwt'
});
const auth_route = {
  get: auth,
  post: auth,
  put: auth,
  delete: auth
}
new LoginController(app.route('/auth/login'));
new RegisterController(app.route('/auth/register'), auth_route);

app.all('*', function(req, res, next){
  res.status(404).json({});
});
// --------------------------------- error handler
app.use((err: Error, req: express.Request, res: express.Response, next) => {
  if (res.headersSent) {
    return next(err);
  }
  logger.error(`[ERROR_HANDLER]`, {
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
    headers: req.headers,
    err: err
  });
  res.status(500).json({msg: 'internal_server_error'});
});
// --------------------------------- db connection
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.db.mongodb, {
  useNewUrlParser: true
});

connection
  .then(db => {
    logger.info(`Successfully connected to ${config.db.mongodb} MongoDB cluster in ${config.env} mode.`);
    return db;
  })
  .catch(err => {
    if (err.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      mongoose.connect(config.db.mongodb, {
        useNewUrlParser: true
      });
    } else {
      logger.error('Error while attempting to connect to database.');
      logger.error(err);
    }
  });
// --------------------------------- port listen
app.listen(config.port, () => logger.info(`Server running on port:${config.port}`));