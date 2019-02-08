import winston from 'winston';
import config from '../config/config';
import debug from 'debug';
import DailyRotateFile from 'winston-daily-rotate-file';

const { splat, combine, timestamp, printf } = winston.format;

let logger: {
  error?;
  warn?;
  info?;
  debug?;
} = {};

if (!config.env || config.env === 'development') {
  logger.error = debug('app:error');
  logger.warn = debug('app:warn');
  logger.info = debug('app:info');
  logger.debug = debug('app:debug');
} else {
  logger = winston.createLogger({
    transports: [
      new winston.transports.File(
        {
          level: 'debug',
          format: combine(
            timestamp(),
            splat(),
            printf(({ timestamp, level, message, meta }) => {
              return `${timestamp}::${level}::${message}::${meta ? JSON.stringify(meta) : ''}`;
            })
          ),
          filename: './logs/log',
          handleExceptions: true,
          maxsize: 5242880, //5MB
          maxFiles: 5
        }
      )
      /*new DailyRotateFile(
        {
          level: 'error',
          format: winston.format.json(),
          filename: './logs/log',
          handleExceptions: true,
          maxSize: 5242880, //5MB
          maxFiles: 5
        }
      )*/
    ]
  });
}

export default logger;