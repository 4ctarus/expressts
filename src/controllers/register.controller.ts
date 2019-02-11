import express from 'express';

import { BaseController } from "./base.controller";
import logger from "../utils/logger";

export class RegisterController extends BaseController {
  
  post(req: express.Request, res: express.Response, next) {
    logger.debug(`[POST:${this.TAG}]`, req.body);
    res.json({});
  }
}