const path = require('path');

const { name } = require(path.resolve(__dirname, '../package.json'));

const withTM = require('next-transpile-modules')([name]);

const configureTranspileModules = (nextConfig) =>
  withTM({
    webpack: (_config, options) => {
      const config = { ..._config };

      if (options.isServer) {
        config.externals = [
          'react',
          'next-auth',
          'i18next-fs-backend',
          'next-i18next',
          ...config.externals,
        ];
      }

      config.resolve.alias['react'] = path.resolve('node_modules', 'react');
      config.resolve.alias['@mui/material'] = path.resolve(
        'node_modules',
        '@mui/material'
      );
      config.resolve.alias['i18next-fs-backend'] = path.resolve(
        'node_modules',
        'i18next-fs-backend'
      );
      config.resolve.alias['next-i18next'] = path.resolve(
        'node_modules',
        'next-i18next'
      );
      config.resolve.alias['next-auth/client'] = path.resolve(
        'node_modules',
        'next-auth/client'
      );

      return config;
    },
    ...nextConfig,
  });

module.exports = { configureTranspileModules };
