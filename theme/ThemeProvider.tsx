import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { EmotionCached } from './next';
import type { ThemeName } from './themes';
import { useTheme } from './useTheme';

/**
 * Client-side emotion cache
 */
const cache = createCache({
  key: 'css',
});

const EmotionCacheProvider = ({
  emotionCache,
  children,
}: React.PropsWithChildren<EmotionCached>): JSX.Element => (
  <CacheProvider value={emotionCache || cache}>{children}</CacheProvider>
);

type ThemeProviderProps = React.PropsWithChildren<
  EmotionCached & {
    themeName?: ThemeName;
  }
>;

const ThemeProvider = ({
  emotionCache,
  themeName = 'bliss',
  children,
}: ThemeProviderProps): JSX.Element => {
  const theme = useTheme(themeName);

  return (
    <EmotionCacheProvider emotionCache={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </EmotionCacheProvider>
  );
};

export type { ThemeProviderProps };
export { ThemeProvider };
