import { NetworkError } from '@basis-theory/basis-theory-portal-commons/src/proxy/NetworkError';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import type {
  FetchPromise,
  FetchResponse,
  TransformOptions,
} from '../api-interfaces';

interface HttpAdapterOptions {
  transform?: TransformOptions;
  handledErrorStatusCodes?: number[];
}

const httpAdapter =
  (method: 'get' | 'post' | 'put' | 'delete') =>
  <Data, Payload = never>(path: string, options?: HttpAdapterOptions) =>
  async (payload?: Payload): FetchPromise<Data> => {
    let data: Data, status: number;

    try {
      const url = `/api/${path}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          payload &&
            (snakecaseKeys(
              payload as never,
              options?.transform?.request || {
                deep: true,
              }
            ) as unknown as BodyInit)
        ),
      });

      ({ status } = response);

      if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json();
        data = camelcaseKeys(
          data,
          options?.transform?.response || {
            deep: true,
          }
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error in client httpAdapter: ${error}`);
      status = -1;
    }

    if (
      (status >= 200 && status < 400) ||
      options?.handledErrorStatusCodes?.includes(status)
    ) {
      return {
        data,
        status,
      };
    }

    throw new NetworkError(status, 'Status code error', data);
  };

/**
 * Http client meant
 * for using in the client-side code.
 * Doesn't have 'GET' method to force
 * usage of `useApi` and `usePaginatedApi` hooks
 */
const httpClient = {
  get: httpAdapter('get'),
  post: httpAdapter('post'),
  put: httpAdapter('put'),
  delete: httpAdapter('delete'),
};

export { httpClient };

export type { FetchResponse, FetchPromise, HttpAdapterOptions };
