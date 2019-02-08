import rateLimit from 'express-rate-limit';
import logger from './logger';
import config from '../config/config';

export class Limiter {
  static getLimiter(data?: Limit) {
    let limit: rateLimit.Options = {
      windowMs: config.limiter.ms,
      max: config.limiter.max,
      handler: function (req, res, /*next*/) {
        logger.debug(`[LIMITER] ${req.method}:${req.path}`);
        res.status(429).json({msg: 'too_many_requests'});
      }
    }
    limit = { ...limit, ...data };

    return new rateLimit(limit)
  }
}

export interface Limit {
  windowMs: number;
  max: number;
}