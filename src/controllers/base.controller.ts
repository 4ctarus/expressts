import logger from "../utils/logger";

const METHODS = ['get', 'post', 'put', 'delete'];
export abstract class BaseController {
  TAG: string;

  constructor(app, auth = {
    get: (req, res, next) => { next(); },
    post: (req, res, next) => { next(); },
    put: (req, res, next) => { next(); },
    delete: (req, res, next) => { next(); }
  }) {
    this.TAG = '';
    this.init(app, auth);
  }

  init(app, auth) {
    this.TAG = this.constructor.name;

    app.all(this.all.bind(this));
    METHODS.forEach(method => {
      if (typeof this[method] === 'function') {
        logger.debug(this.TAG, `has ${method}`);
        app[method](auth[method], this[method].bind(this))
      }
    });
  }

  all(req, res, next) {
    logger.debug(`[ALL:${this.TAG}]`, this.constructor.name);
    next();
  }
}