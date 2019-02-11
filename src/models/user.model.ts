import { Schema, model, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  salt: string;
  lastname: string;
  firstname: string;
  birthdate: string;
  lang: string;
  recoveryCode: string;
  active: string;
}

const _shema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    match: /^[0-9a-z]+$/ // is alpha-numeric
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
  birthdate: {
    type: Date,
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

_shema.pre('find', function () {
  this.where({
    active: true
  });
});
_shema.pre('findOne', function () {
  this.where({
    active: true
  });
});

export default model<UserDocument>('User', _shema);