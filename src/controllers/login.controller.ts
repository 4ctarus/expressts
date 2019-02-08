import express from 'express';

import { BaseController } from "./base.controller";
import logger from "../utils/logger";

export class LoginController extends BaseController {

  post(req: express.Request, res: express.Response, next) {
    res.json({});
  }
}