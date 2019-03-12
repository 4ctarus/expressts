import express from 'express';
import { Types } from 'mongoose';
import { BaseController } from "./base.controller";
import logger from "../utils/logger";
import roleModel from '../models/role.model';

export class RolesController extends BaseController {

  get(req, res, next) {
    roleModel.find().then(
      roles => {
        res.status(roles.length > 0 ? 200 : 404).json(roles || []);
      }
    )
  }

  post(req, res, next) {
    roleModel.create(req.body)
    .then(role => {
      res.status(201).json({});
    })
    .catch(err => {
      next(err);
    });
  }
}