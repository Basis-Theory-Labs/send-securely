import type { NextApiHandler } from 'next';
import { withLogging } from '@/server-side/withLogging';

const staticApi = <T>(controllerName: string, payload: T): NextApiHandler =>
  withLogging<T>(controllerName, {
    GET: (req, res) => {
      res.status(200).json(payload);
    },
  });

export { staticApi };
