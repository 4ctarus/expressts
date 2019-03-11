import fs from 'fs';
import * as dotenv from "dotenv";
dotenv.config();

let config;
export default config = {
  env: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'development' : 'production',
  port: process.env.PORT || '3000',

  db: {
    mongodb: 'mongodb://localhost:27017/expressts'
  },

  limiter: {
    ms: 15 * 60 * 1000, // 15 minutes
    max: 10,
  },

  cert: {
    public: fs.readFileSync('public_key.pem'),
    private: fs.readFileSync('private_key.pem')
  },

  user: {
    default_role: 'user'
  }
}