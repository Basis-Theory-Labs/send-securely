import { responsiveFontSizes, createTheme } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { baseThemeOptions } from './base';

export const light = responsiveFontSizes(
  createTheme(
    merge(cloneDeep(baseThemeOptions), {
      palette: {
        mode: 'light',
      },
    })
  )
);
