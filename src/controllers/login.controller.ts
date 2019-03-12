import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import logger from "../utils/logger";
import { BaseController } from "./base.controller";
import User, { UserDocument } from '../models/user.model';
import config from '../config/config';

export class LoginController extends BaseController {

  post(req, res, next) {
    logger.debug(`[POST:${this.TAG}]`);

    const body = req.body || {};

    if (!body.login) {
      return res.status(422).json({ err: 'login_required' });
    }

    if (!body.password) {
      return res.status(422).json({ err: 'password_required' });
    }

    User.findOne({
      $or: [
        { email: body.login },
        { username: body.login }
      ]
    })
      .then(user => {
        if (!user) {
          return res.status(404).json({ err: 'not_found' });
        }
        if (this.validatePassword(body.password, user)) {
          res.json({
            token: this.generateJWT(user),
            user: {
              email: user.email,
              _id: user._id,
              lastame: user.lastname,
              firstname: user.firstname,
              username: user.username,
              birthdate: user.birthdate
            }
          });
        } else {
          res.status(400).json({ err: 'bad_request' });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  validatePassword(password: string, user: UserDocument) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.password === hash;
  };

  generateJWT(user: UserDocument) {
    return jwt.sign({
      sub: user._id,
      admin: false
    }, config.cert.private, {
        algorithm: 'RS256',
        expiresIn: '2d'
      });
  }
}