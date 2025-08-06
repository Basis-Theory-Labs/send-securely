import { useRef } from 'react';
import { transformResponseCamelCase } from '@basis-theory/basis-theory-js/common';
import axios, { AxiosResponseTransformer } from "axios";
import * as queryString from 'query-string';
import type { SWRResponse } from 'swr';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr/dist/types';
import { NetworkError } from '../../proxy/NetworkError';
import type { Query } from '../types';

type UseApi<Data, Error> = SWRResponse<Data, Error>;

interface UseApiOptions extends SWRConfiguration {
  /**
   * Whether to stick with previous data
   * while fetching new data. <br>
   * If `false`, data will turn to `undefined`
   * while fetching (default swr behaviour).
   * @default false
   */
  sticky?: boolean;

  /**
   *
   * @default deeply transform response to camel case
   */
  transformResponse?: (data: any, headers?: any) => any;

  /**
   * Additional request headers to be sent.
   * Used mainly for User-Agent in different portal implementations
   * @default {}
   */
  headers?: Record<string, string>;
}

const fetcher =
  (transformResponse: (data: any, headers?: any) => any, headers?: Record<string, string>) =>
  async <T>(url: string): Promise<T> => {
    const { data, status } = await axios.get(url, {
      validateStatus: () => true,
      transformResponse: [
        ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
        transformResponse,
      ],
      headers,
    });

    if (status >= 400) {
      throw new NetworkError(status, 'Network error in useApi hook', data);
    }

    return data;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApi = <Data = any, Error = unknown>(
  path: string,
  query?: Query,
  {
    sticky: isSticky,
    transformResponse,
    headers,
    ...options
  }: UseApiOptions = {}
): UseApi<Data, Error> => {
  let key = `/api/${path}`;

  if (query && Object.keys(query).length) {
    key += `?${queryString.stringify(query)}`;
  }

  const sticky = useRef<Data>(undefined);

  const {
    data: response,
    error,
    ...rest
  } = useSWR<Data>(key, {
    ...options,
    fetcher: fetcher(transformResponse || transformResponseCamelCase, headers),
  });

  if (error) {
    throw error;
  }

  if (response !== undefined) {
    sticky.current = response;
  }

  const value = isSticky ? sticky.current : response;

  return {
    data: value,
    ...rest,
  };
};

export { useApi };
export type { UseApi, UseApiOptions };
