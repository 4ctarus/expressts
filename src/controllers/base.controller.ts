import logger from "../utils/logger";

export abstract class BaseController {
  TAG: string;

  constructor(app) {
    this.TAG = '';
    app.all(this.all.bind(this))
      .get(this.get.bind(this))
      .post(this.post.bind(this))
      .put(this.put.bind(this))
      .delete(this.delete.bind(this));
  }

  init() {
    this.TAG = this.constructor.name;
  }

  all(req, res, next) {
    logger.debug(`[ALL:${this.TAG}]`);
    next();
  }

  get(req, res, next) {
    next();
  }
  post(req, res, next) {
    next();
  }
  put(req, res, next) {
    next();
  }
  delete(req, res, next) {
    next();
  }
}