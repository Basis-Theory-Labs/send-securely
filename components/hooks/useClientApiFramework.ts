import { useMemo, useState } from 'react';
import { NetworkError } from '@basis-theory/basis-theory-portal-commons/src/proxy/NetworkError';
import { clientApiFramework } from '@/api-framework/client';

type ClientApiFramework = typeof clientApiFramework;

// eslint-disable-next-line @typescript-eslint/ban-types
const createProxy = <T extends object>(
  value: T,
  throwError: (error: unknown) => unknown
): T =>
  new Proxy(value, {
    get: (target, name) => {
      const targetValue = target[name];

      if (typeof targetValue === 'function') {
        return async (...args) => {
          try {
            return await targetValue(...args);
          } catch (error) {
            if (error instanceof NetworkError) {
              throwError(error);
            }

            throw error;
          }
        };
      }

      if (typeof targetValue === 'object') {
        return createProxy(targetValue, throwError);
      }

      return targetValue;
    },
  });

/**
 * Wraps clientApiFramework services in a Proxy,
 * so if any of its methods returned Promise rejects
 * a NetworkError, it also throws it at the render cycle,
 * so it can get caught in the NetworkErrorBoundary that
 * redirects to proper error pages.
 */
const useClientApiFramework = (): ClientApiFramework => {
  const [, setError] = useState();

  return useMemo(
    () =>
      createProxy(clientApiFramework, (error) =>
        setError(() => {
          throw error;
        })
      ),
    []
  );
};

export { useClientApiFramework };
