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
    const { nonce, gaMeasurementId } = useDocument();

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
            href="https://fonts.googleapis.com/css2?family=Outfit:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');`,
            }}
          />
        </Head>
        <body>
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
