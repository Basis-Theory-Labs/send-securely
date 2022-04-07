import { FetchPromise, HttpAdapterOptions, httpClient } from './http-client';

const updateById =
  <T, U>(path: string, options?: HttpAdapterOptions) =>
  (update: U & { id: string }): FetchPromise<T> =>
    httpClient.put<T, U>(`${path}/${update.id}`, options)(update);

const deleteById =
  (path: string, options?: HttpAdapterOptions) =>
  (id: string): FetchPromise =>
    httpClient.delete(`${path}/${id}`, options)();

export { deleteById, updateById };
