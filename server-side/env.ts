import {
  cleanEnv,
  cached,
} from '@basis-theory/basis-theory-portal-commons/src/config';
import { str } from 'envalid';

const env = cached(
  cleanEnv,
  {
    API_BASE_URL: str({
        desc: "The base api url",
        default: undefined
    }),
    BT_API_KEY: str({
      desc: 'The BT server to server API key',
    }),

  }
);

export { env };
