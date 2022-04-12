import type { Theme, PaletteMode } from '@mui/material';
import { light, dark } from './bliss';

type ThemeName = 'bliss';

type Themes = {
  [theme in ThemeName]: {
    [mode in PaletteMode]: Theme;
  };
};

const themes: Themes = {
  bliss: {
    light,
    dark,
  },
};

export type { ThemeName, Themes };
export { themes };
