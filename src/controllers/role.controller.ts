import express from 'express';
import { Types } from 'mongoose';
import { BaseController } from "./base.controller";
import logger from "../utils/logger";
import roleModel from '../models/role.model';

export class RoleController extends BaseController {

  get(req, res, next) {
    if (Types.ObjectId.isValid(req.params.id)) {
      roleModel.findById(req.params.id).then(
        role => {
          res.status(role ? 200 : 404).json(role || {});
        }
      )
    } else {
      res.status(400).json({
        err: 'invalid_id'
      })
    }
  }
}