import * as dotenv from "dotenv";
dotenv.config();

let config;
export default config = {
  env: (process.env.PROD !== '1' && process.env.PROD !== 'true') ? 'development' : 'production',
  port: process.env.PORT,

  limiter: {
    ms: 15 * 60 * 1000, // 15 minutes
    max: 10, 
  }
}