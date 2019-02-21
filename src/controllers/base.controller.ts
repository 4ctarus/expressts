import logger from "../utils/logger";
import { IRoute, Request, Response, NextFunction } from "express";

const METHODS = ['get', 'post', 'put', 'delete'];
export abstract class BaseController {
  TAG: string;

  constructor(route: IRoute, auth: Auth = {
    get: (req, res, next) => { next(); },
    post: (req, res, next) => { next(); },
    put: (req, res, next) => { next(); },
    delete: (req, res, next) => { next(); }
  }) {
    this.TAG = '';
    this.init(route, auth);
  }

  init(route: IRoute, auth: Auth) {
    this.TAG = this.constructor.name;

    route.all(this.all.bind(this));
    METHODS.forEach(method => {
      if (typeof this[method] === 'function') {
        logger.debug(this.TAG, `has ${method}`);
        route[method](auth[method], this[method].bind(this))
      }
    });
  }

  all(req, res, next) {
    logger.debug(`[ALL:${this.TAG}]`, this.constructor.name);
    next();
  }
}

interface Auth {
  get: (req: Request, res: Response, next: NextFunction) => void;
  post: (req: Request, res: Response, next: NextFunction) => void;
  put: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
}