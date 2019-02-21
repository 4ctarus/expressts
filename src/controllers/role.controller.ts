import express from 'express';

import { BaseController } from "./base.controller";
import logger from "../utils/logger";

export class RoleController extends BaseController {
  
  get(req: express.Request, res: express.Response, next) {
    logger.debug(`[GET:${this.TAG}]`, req.body);
    res.json({});
  }

  put(req: express.Request, res: express.Response, next) {
    logger.debug(`[PUT:${this.TAG}]`, req.body);
    res.json({});
  }

  delete(req: express.Request, res: express.Response, next) {
    logger.debug(`[PUT:${this.TAG}]`, req.body);
    res.json({});
  }
}