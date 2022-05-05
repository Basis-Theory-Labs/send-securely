import { BasisTheory } from '@basis-theory/basis-theory-js';
import { cached } from '@/server-side/cache';
import { env } from '@/server-side/env';

const initBasisTheory = ({ apiKey, baseUrl }): Promise<BasisTheory> =>
  new BasisTheory().init(apiKey, {
    apiBaseUrl: baseUrl,
  }) as Promise<BasisTheory>;

const getBasisTheoryClient = cached(initBasisTheory, {
  apiKey: env().BT_API_KEY,
  baseUrl: env().BT_API_BASE_URL,
});

export { getBasisTheoryClient };
