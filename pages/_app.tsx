import React from 'react';
import { Settings } from 'luxon';
import { appWithTranslation, useTranslation } from 'next-i18next';
import Head from 'next/head';
import { NetworkErrorBoundary } from '@/components/shared/NetworkErrorBoundary';
import { ThemeProvider } from '@/theme';
import type { AppProps } from '@/theme/next';
import '../styles/globals.css';
import ErrorPage from './_error';

const MyApp = ({
  Component,
  pageProps,
  emotionCache,
}: AppProps): JSX.Element => {
  const { i18n } = useTranslation();

  Settings.defaultLocale = i18n.language;

  return (
    <NetworkErrorBoundary Component={ErrorPage}>
      <Head>
        <title>{'SendSecure.ly - Send your secret, securely.'}</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ThemeProvider emotionCache={emotionCache}>
        <Component {...pageProps} />
      </ThemeProvider>
    </NetworkErrorBoundary>
  );
};

export default appWithTranslation(MyApp);
