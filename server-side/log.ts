import type { NextApiRequest } from 'next';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
  timestamp: pino.stdTimeFunctions.isoTime,
});

const error = logger.error.bind(logger);
const info = logger.info.bind(logger);

/* istanbul ignore next */
const logRequest = (controllerName: string, req: NextApiRequest): void =>
  info(`Request to ${controllerName} controller: ${req.method} ${req.url}`);

export { error as logError, info as logInfo, logRequest };
