import React from 'react';
import { Settings } from 'luxon';
import { appWithTranslation, useTranslation } from 'next-i18next';
import Head from 'next/head';
import { AbstractBackground } from '@/components/shared/AbstractBackground';
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
        <title>
          {'sendsecure.ly - Share secrets without the digital footprint.'}
        </title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
          name="viewport"
        />
        <meta
          content="Send passwords, keys, and other sensitive data with a single-use link."
          key="description"
          name="description"
        />
        <meta
          content="sendsecure.ly - Share secrets without the digital footprint."
          key="og:title"
          property="og:title"
        />
        <meta
          content="Send passwords, keys, and other sensitive data with a single-use link."
          key="og:description"
          property="og:description"
        />
        <meta
          content="https://cdn.basistheory.com/images/seo/sendsecurely-opengraph.png"
          key="og:image"
          property="og:image"
        />
        <meta
          content="sendsecure.ly - Share secrets without the digital footprint."
          key="twitter:title"
          property="twitter:title"
        />
        <meta
          content="Send passwords, keys, and other sensitive data with a single-use link."
          key="twitter:description"
          property="twitter:description"
        />
        <meta
          content="https://cdn.basistheory.com/images/seo/sendsecurely-opengraph.png"
          key="twitter:image"
          property="twitter:image"
        />
        <meta content="website" property="og:type" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <ThemeProvider emotionCache={emotionCache}>
        <Component {...pageProps} />
        <AbstractBackground />
      </ThemeProvider>
    </NetworkErrorBoundary>
  );
};

export default appWithTranslation(MyApp);
