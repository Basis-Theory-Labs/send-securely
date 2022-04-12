const { createSecureHeaders } = require('next-secure-headers');
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  poweredByHeader: false,
  headers: () => [
    {
      source: '/(.*)',
      headers: createSecureHeaders({
        referrerPolicy: 'strict-origin-when-cross-origin',
      }),
    },
  ],
  serverRuntimeConfig: {
    /* eslint-disable node/no-process-env */
    gtmId: process.env.GTM_ID,
    /* eslint-enable node/no-process-env */
  },
};
