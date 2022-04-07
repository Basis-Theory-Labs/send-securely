import type camelcaseKeys from 'camelcase-keys';
import type snakecaseKeys from 'snakecase-keys';

interface TransformOptions {
  request?: snakecaseKeys.Options;
  response?: camelcaseKeys.Options;
}

interface FetchResponse<Data> {
  data: Data;
  status: number;
}

type FetchPromise<Data = unknown> = Promise<FetchResponse<Data>>;

export type { TransformOptions, FetchPromise, FetchResponse };
