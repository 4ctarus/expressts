import config from './config/config';
import express from 'express';
import helmet from 'helmet';


import logger from './utils/logger'
import { Limiter } from './utils/limiter';
import { BaseController } from './controllers/base.controller';
import { LoginController } from './controllers/login.controller';

const app = express();
app.use(helmet());
// --------------------------------- route limiter
app.use('/', Limiter.getLimiter())
// --------------------------------- route
/*app.get('/', (req: express.Request, res: express.Response, next) => {
  // next(new Error('custom error'));
  res.json({});
});*/
new LoginController(app.route('/auth/login'));

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
// --------------------------------- port listen
app.listen(config.port, () => logger.info(`Server running on port:${config.port}`));