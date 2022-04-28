/* eslint-disable react/no-danger */
// captured from https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useDocument } from '@/components/pages/Document.hooks';
import { dark } from '@/theme/bliss';
import { setupSsrStyles } from '@/theme/next';

class MyDocument extends Document {
  public render(): JSX.Element {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { nonce } = useDocument();

    return (
      <Html lang="en">
        <Head nonce={nonce}>
          {/* PWA primary color */}
          <meta content={dark.palette.primary.main} name="theme-color" />
          {/* Theme fonts */}
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="/manifest.webmanifest" rel="manifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <script
            data-domain="sendsecure.ly"
            defer
            src="https://plausible.io/js/script.manual.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              var url = window.location.href;
              var redactedUrl = url.replace(/\\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, "/secret-id");
              plausible('pageview', { u: redactedUrl });`,
            }}
          />
          <meta
            content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
            name="viewport"
          />
          <meta
            content="Send passwords, keys, and other sensitive data with a single-use link."
            name="description"
          />
          <meta
            content="sendsecure.ly - Share secrets without the digital footprint."
            property="og:title"
          />
          <meta
            content="Send passwords, keys, and other sensitive data with a single-use link."
            property="og:description"
          />
          <meta
            content="https://cdn.basistheory.com/images/seo/sendsecurely-opengraph.png"
            property="og:image"
          />
          <meta
            content="sendsecure.ly - Share secrets without the digital footprint."
            property="twitter:title"
          />
          <meta
            content="Send passwords, keys, and other sensitive data with a single-use link."
            property="twitter:description"
          />
          <meta
            content="https://cdn.basistheory.com/images/seo/sendsecurely-opengraph.png"
            property="twitter:image"
          />
          <meta content="website" property="og:type" />
          <meta content="summary_large_image" name="twitter:card" />
        </Head>
        <body
          style={{
            background:
              'radial-gradient(61.89% 61.89% at 50% 8.83%, #2C2C2C 0%, #0C0C0C 100%)',
            minHeight: '100vh',
          }}
        >
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);

  const styles = await setupSsrStyles(ctx);

  return {
    ...initialProps,
    styles,
  };
};

export default MyDocument;

/* eslint-enable react/no-danger */
