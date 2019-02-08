import logger from "../utils/logger";

export abstract class BaseController {

  constructor(base) {
    base.all(this.all.bind(this))
      .get(this.get.bind(this))
      .post(this.post.bind(this))
      .put(this.put.bind(this))
      .delete(this.delete.bind(this));
  }

  all(req, res, next) {
    logger.debug(`[ALL:${this.constructor.name}]`);
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