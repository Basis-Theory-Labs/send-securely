import type { Secret, CreateSecret } from '@/globals';
import { httpClient } from './http-client';

const secrets = {
  create: httpClient.post<Secret, CreateSecret>('secrets'),
  get: ({ id }) => httpClient.get<Secret>(`secrets/${id}`)(),
};

export const clientApiFramework = {
  secrets,
} as const;

export * from './useApi';
