import type { PaletteMode } from '@mui/material';

export const useThemeMode = (): PaletteMode =>
  // detect from user-agent or OS
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // eslint-disable-next-line no-warning-comments
  // TODO select from user preferences (state / profile / metadata)

  'dark';
