import React from 'react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import type { EmotionCache } from '@emotion/utils';
import type { AppProps as NextAppProps } from 'next/dist/pages/_app';
import type {
  AppContextType,
  AppInitialProps,
  AppPropsType,
  NextComponentType,
} from 'next/dist/shared/lib/utils';
import type { DocumentContext } from 'next/document';
import Document from 'next/document';

interface EmotionCached {
  emotionCache?: EmotionCache;
}

interface AppProps extends NextAppProps, EmotionCached {}

/**
 * Server-side emotion cache
 */
const cache = createCache({
  key: 'css',
});
const { extractCriticalToChunks } = createEmotionServer(cache);

type AppType = NextComponentType<
  AppContextType,
  AppInitialProps,
  AppPropsType & EmotionCached
>;

const setupSsrStyles = async (
  ctx: DocumentContext
): Promise<React.ReactElement[] | React.ReactFragment> => {
  const { renderPage: originalRenderPage } = ctx;

  // this is the recommended MUI Next Approach
  // eslint-disable-next-line no-param-reassign
  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: AppType) => (props) =>
        <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
    />
  ));

  return [...React.Children.toArray(initialProps.styles), ...emotionStyleTags];
};

export type { AppProps, EmotionCached };
export { setupSsrStyles };
