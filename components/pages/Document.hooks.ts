import crypto from 'crypto';
import getConfig from 'next/config';
import { v4 as uuid } from 'uuid';

const { serverRuntimeConfig } = getConfig();
const { gaMeasurementId } = serverRuntimeConfig;

/**
 * Generate Content Security Policy for the app.
 * Uses randomly generated nonce (base64)
 *
 * @returns {csp: string, nonce: string}
 */
export const useDocument = (): {
  nonce: string;
  gaMeasurementId: string;
} => {
  // Generate random nonce converted to base64. Must be different on every HTTP page load
  const hash = crypto.createHash('sha256');

  hash.update(uuid());
  const nonce = hash.digest('base64');

  return {
    nonce,
    gaMeasurementId,
  };
};
