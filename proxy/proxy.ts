import axios, { AxiosRequestConfig, Method } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Awaitable } from 'next-auth/internals/utils';
import { logError, logRequest } from '../server-side/log';

interface Response {
  status: number;
  data?: unknown;
}

type Abort = (response: Response) => AxiosRequestConfig;
type Transform = (
  config: AxiosRequestConfig,
  req: NextApiRequest,
  abort: Abort
) => Awaitable<AxiosRequestConfig>;

interface ApiProxyOptions {
  apiBaseUrl: string;
  proxyBaseUrl: string;
  transform?: Transform;
}

const controllerName = 'Proxy API';

const proxyApi =
  ({
    apiBaseUrl,
    proxyBaseUrl,
    transform = (config) => config,
  }: ApiProxyOptions) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    logRequest(controllerName, req);

    const { url: reqUrl, method, body } = req;
    const regex = new RegExp(`^${proxyBaseUrl}`, 'u');
    const url = reqUrl?.replace(regex, '');

    if (reqUrl === url) {
      logError(
        `${controllerName} url "${reqUrl}" doesn't start with proxyBaseUrl "${proxyBaseUrl}"`
      );
      res.status(500).send(undefined);

      return;
    }

    let abortedWith: Response | undefined;

    const baseConfig = {
      method: method as Method,
      baseURL: apiBaseUrl,
      url,
      data: body,
      validateStatus: () => true,
    };

    const abort: Abort = (response: Response) => {
      abortedWith = response;

      return baseConfig;
    };

    const config = await transform(baseConfig, req, abort);

    if (abortedWith) {
      res.status(abortedWith.status).send(abortedWith.data);

      return;
    }

    try {
      const { status, data } = await axios.request(config);

      res.status(status).send(data);

      return;
    } catch (error) {
      logError('There was an error making a request to downstream API: ');
      logError(error as Error);
      res.status(500).send(undefined);

      return;
    }
  };

export { proxyApi };
export type { Abort, Transform };
