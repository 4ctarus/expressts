import * as dotenv from "dotenv";
dotenv.config();

let config;
export default config = {
  env: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'development' : 'production',
  port: process.env.PORT || '3000',

  db: {
    mongodb: 'mongodb://localhost/expressts'
  },

  limiter: {
    ms: 15 * 60 * 1000, // 15 minutes
    max: 10,
  }
}