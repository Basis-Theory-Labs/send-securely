import { str, ValidatorSpec, cleanEnv } from 'envalid';
import type { CleanedEnvAccessors, CleanOptions } from 'envalid';
import { cached } from './cache';

const cleanEnvWithSecrets = <T>(
  specs: {
    [K in keyof T]: ValidatorSpec<T[K]>;
  },
  options: CleanOptions<T> = {}
): Readonly<T & CleanedEnvAccessors> => {
  const source = process.env;

  const env = cleanEnv(source, specs, options);

  return Object.freeze({
    ...env,
  });
};

const env = cached(cleanEnvWithSecrets, {
  API_BASE_URL: str({
    desc: 'The base api url',
    default: undefined,
  }),
  BT_API_KEY: str({
    desc: 'The BT server to server API key',
  }),
  BT_API_BASE_URL: str({
    desc: 'The BT API base URL',
    default: 'https://api.basistheory.com/',
  }),
});

export { env };
