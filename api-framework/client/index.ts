import type { Secret, CreateSecret } from '@/globals';
import { httpClient } from './http-client';

export * from './useApi';

const secrets = {
  create: httpClient.post<Secret, CreateSecret>('secrets'),
  get: ({ id }) => httpClient.get<Secret>(`secrets/${id}`)(),
};

export const clientApiFramework = {
  secrets,
} as const;
