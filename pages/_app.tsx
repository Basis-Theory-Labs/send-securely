import React from 'react';
import { Settings } from 'luxon';
import { appWithTranslation, useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AbstractBackground } from '@/components/shared/AbstractBackground';
import { NetworkErrorBoundary } from '@/components/shared/NetworkErrorBoundary';
import { OpenGraphTags } from '@/components/shared/OpenGraphTags';
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
  const router = useRouter();

  const isSharingSecret = router.route === '/[id]';
  const title = 'sendsecure.ly - Share secrets without the digital footprint.';

  Settings.defaultLocale = i18n.language;

  return (
    <NetworkErrorBoundary Component={ErrorPage}>
      <Head>
        <title>{title}</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <OpenGraphTags isSharingSecret={isSharingSecret} title={title} />
      </Head>
      <ThemeProvider emotionCache={emotionCache}>
        <Component {...pageProps} />
        <AbstractBackground />
      </ThemeProvider>
    </NetworkErrorBoundary>
  );
};

export default appWithTranslation(MyApp);
