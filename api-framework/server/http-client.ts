import axiosImport, { Method } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { env } from '@/server-side/env';
import { logInfo } from '@/server-side/log';
import type { FetchPromise, TransformOptions } from '../api-interfaces';

interface HttpAdapterOptions {
  transform?: TransformOptions;
}

const httpAdapter =
  (method: Method) =>
  <Data, Payload = unknown>(path: string, options?: HttpAdapterOptions) =>
  async (accessToken: string, payload?: Payload): FetchPromise<Data> => {
    let authorizationHeader = {};

    if (accessToken) {
      authorizationHeader = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    const data =
      payload &&
      snakecaseKeys(
        payload as never,
        options?.transform?.request || {
          deep: true,
        }
      );

    const response = await axiosImport.request<Data>({
      baseURL: env().API_BASE_URL,
      method,
      url: path,
      headers: {
        'Content-Type': 'application/json',
        ...authorizationHeader,
      },
      data,
      validateStatus: () => true,
    });

    logInfo(`Received ${response.status} from ${path}`);

    return {
      data:
        response.data &&
        camelcaseKeys(
          response.data,
          options?.transform?.response || {
            deep: true,
          }
        ),
      status: response.status,
    };
  };

const httpClient = {
  get: httpAdapter('get'),
  delete: httpAdapter('delete'),
  post: httpAdapter('post'),
};

export { httpClient };
