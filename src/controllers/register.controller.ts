import express from 'express';
import crypto from 'crypto';

import logger from "../utils/logger";
import { BaseController } from "./base.controller";
import User, { UserDocument } from '../models/user.model';

export class RegisterController extends BaseController {

  post(req: express.Request, res: express.Response, next) {
    logger.debug(`[POST:${this.TAG}]`);

    const body = req.body || {};
    let lang = 'en';
    if ((req.headers["accept-language"] || '').includes('fr')) {
      lang = 'fr';
    }

    let user = Object.assign(body, {
      lang: lang,
      birthdate: new Date(body.birthdate)
    });
    this.setPassword(user);
    User.create(user)
      .then(user => {
        res.status(201).json({});
      })
      .catch(err => {
        next(err);
      });
  }

  setPassword(user: UserDocument) {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = crypto.pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512').toString('hex');
  };
}