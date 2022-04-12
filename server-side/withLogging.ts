import type { NextApiHandler, NextApiRequest } from 'next';
import { logRequest } from './log';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type WildCard<T> = Record<'*', NextApiHandler<T>>;
type MethodMapping<T> = Partial<Record<Method, NextApiHandler<T>>>;

interface WithLoggingOptions {
  hideSearch?: boolean;
}

interface Message {
  message: string;
}

const withLogging =
  <T>(
    controllerName: string,
    handlers: MethodMapping<T> | WildCard<T>,
    options: WithLoggingOptions = {}
  ): NextApiHandler<T | Message> =>
  (req, res) => {
    logRequest(controllerName, {
      ...req,
      url: options.hideSearch ? req.url?.split('?')[0] : req.url,
    } as NextApiRequest);

    const wildcard = handlers as WildCard<T>;
    let handler: NextApiHandler | undefined = wildcard['*'];

    if (handler) {
      return handler(req, res);
    }

    const mapping = handlers as MethodMapping<T>;

    handler = mapping[req.method as Method];

    if (handler) {
      return handler(req, res);
    }

    res.status(404).json({
      message: 'Endpoint not found',
    });

    return undefined;
  };

export { withLogging };
export type { WithLoggingOptions, MethodMapping, WildCard, Method };
