import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email_invalid']
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    match: [/^[0-9a-z]+$/, 'username_invalid'] // is alpha-numeric
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lang: {
    type: String,
    enum: ['en', 'fr'],
    lowercase: true,
    trim: true,
    required: true,
    default: 'en'
  },
  recoveryCode: {
    type: String,
    trim: true,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
}, {
    collection: 'users',
    timestamps: true
  });

UserSchema.pre('find', function () {
  this.where({
    active: true
  });
});
UserSchema.pre('findOne', function () {
  this.where({
    active: true
  });
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({
    sub: this._id,
    admin: false
  }, 'secret', {
      algorithm: 'RS256',
      expiresIn: '2d'
    });
}

export default model('User', UserSchema);