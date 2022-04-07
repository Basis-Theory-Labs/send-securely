/* eslint-disable react/no-danger */

/* eslint-disable @next/next/next-script-for-ga */
// captured from https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
import React from 'react';
import { dark } from '@basis-theory/basis-theory-portal-commons/src/theme/bliss';
import { setupSsrStyles } from '@basis-theory/basis-theory-portal-commons/src/theme/next';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useDocument } from '@/components/pages/Document.hooks';

class MyDocument extends Document {
  public render(): JSX.Element {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { nonce, gtmId } = useDocument();

    return (
      <Html lang="en">
        <Head nonce={nonce}>
          {/* PWA primary color */}
          <meta content={dark.palette.primary.main} name="theme-color" />
          {/* Theme fonts */}
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="/manifest.webmanifest" rel="manifest" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
          n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
          `,
            }}
            nonce={nonce}
            type="text/javascript"
          />
        </Head>
        <body>
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              style={{
                display: 'none',
                visibility: 'hidden',
              }}
              title="gtm-iframe"
              width="0"
            />
          </noscript>
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
/* eslint-enable @next/next/next-script-for-ga */
