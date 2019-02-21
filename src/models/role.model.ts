import { Schema, model, Document, Model } from 'mongoose';

export interface RoleDocument extends Document {
  name: string;
  paths: string[]; // disabled path
}

const _shema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    match: /^[0-9a-z]+$/ // is alpha-numeric
  },
  paths: {
    type: [String],
    required: true
  }
}, {
    collection: 'roles',
    timestamps: true
  });

export default model<RoleDocument>('Role', _shema);