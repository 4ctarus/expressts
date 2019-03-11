import debug from 'debug';


let logger: {
  error?;
  warn?;
  info?;
  debug?;
} = {};

logger.error = debug('app:error');
logger.warn = debug('app:warn');
logger.info = debug('app:info');
logger.debug = debug('app:debug');

export default logger;