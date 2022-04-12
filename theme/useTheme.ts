import type { Theme } from '@mui/material';
import type { ThemeName } from './themes';
import { themes } from './themes';
import { useThemeMode } from './useThemeMode';

const useTheme = (name: ThemeName): Theme => themes[name][useThemeMode()];

export { useTheme };
