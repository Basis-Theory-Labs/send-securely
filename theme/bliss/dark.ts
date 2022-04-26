import type { ThemeOptions } from '@mui/material';
import { responsiveFontSizes, alpha, createTheme } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { baseThemeOptions } from './base';

const defaultContrastText = '#000000';
const grey = {
  '50': '#F2F4FF',
  '100': '#CACDDB',
  '200': '#A4A9C5',
  '300': '#8B92B6',
  '400': '#8B92B6',
  '500': '#6B7294',
  '600': '#545A78',
  '700': '#323856',
  '800': '#1E233B',
  '900': '#13172A',
  '1000': defaultContrastText,
};

const divider = alpha('#414970', 0.5);
const successContrastText = alpha('#070A1B', 0.9);

const textPrimary = '#E5E6EC';
const textSecondary = '#838383';

const options: ThemeOptions = {
  palette: {
    mode: 'dark',
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      disabled: alpha('#a3b0ec', 0.4),
    },
    action: {
      active: '#5383FF',
      hover: '#20243A',
      selected: alpha('#000000', 0.08),
      selectedOpacity: 0.08, // does not produce desired effect
      disabled: alpha('#CED3FF', 0.4),
      disabledBackground: alpha('#B6BADC', 0.3),
    },
    primary: {
      main: '#5383FF',
      dark: '#3658B2',
      light: '#5383FF',
      contrastText: defaultContrastText,
    },
    secondary: {
      main: '#5383FF',
      dark: '#4F43CD',
      light: '#A583FF',
      contrastText: defaultContrastText,
    },
    success: {
      main: '#3AC3A2',
      dark: '#009273',
      light: '#75F6D3',
      contrastText: successContrastText,
    },
    info: {
      main: '#1AD1DB',
      dark: '#009FA9',
      light: '#009FA9',
      contrastText: alpha(defaultContrastText, 0.9),
    },
    warning: {
      main: '#FFD582',
      dark: '#CA931D',
      light: '#FFFFB3',
      contrastText: alpha(defaultContrastText, 0.9),
    },
    error: {
      main: '#FB5B8B',
      dark: '#C3205E',
      light: '#FF8FBB',
      contrastText: alpha(defaultContrastText, 0.9),
    },
    background: {
      default: defaultContrastText,
      paper: '#1D1D1D',
    },
    divider, // used for borders
    grey,
    accent100: {
      main: '#47DAE2',
      contrastText: defaultContrastText,
    },
    accent200: {
      main: '#5F7BFF',
      contrastText: defaultContrastText,
    },
    accent300: {
      main: '#7E67F3',
      contrastText: defaultContrastText,
    },
    accent400: {
      main: '#E05CDB',
      contrastText: defaultContrastText,
    },
    accent500: {
      main: '#F56C75',
      contrastText: defaultContrastText,
    },
    accent600: {
      main: '#FFD582',
      contrastText: defaultContrastText,
    },
    accent700: {
      main: '#00B674',
      contrastText: defaultContrastText,
    },
    textPrimary: {
      main: textPrimary,
    },
    textSecondary: {
      main: textSecondary,
    },
    grey50: { main: grey['50'] },
    grey100: { main: grey['100'] },
    grey200: { main: grey['200'] },
    grey300: { main: grey['300'] },
    grey400: { main: grey['400'] },
    grey500: { main: grey['500'] },
    grey600: { main: grey['600'] },
    grey700: { main: grey['700'] },
    grey800: { main: grey['800'] },
    grey900: { main: grey['900'] },
    grey1000: { main: grey['1000'] },
  },
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottomColor: divider,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTopColor: divider,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        light: {
          borderColor: '#4A4C65',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: alpha(grey['700'], 0.2),
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: divider,
        },
        head: {
          color: grey['200'],
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          color: successContrastText,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'unset',
          borderColor: 'rgba(209, 215, 255, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        underline: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: '#1D1D1D',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: divider,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: textPrimary,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary'
            ? {
                // using styleOverrides.primary prop doesn't work
                color: `${theme.palette.primary.main}`,
                borderColor: alpha(theme.palette.primary.main, 0.5),
                ...(ownerState.selected // using styleOverrides.selected doesn't work
                  ? {
                      backgroundColor: `${alpha(
                        theme.palette.primary.main,
                        0.2
                      )} !important`,
                    }
                  : {}),
              }
            : {}),
        }),
        sizeSmall: {
          lineHeight: 18 / 12,
        },
      },
    },
  },
};

export const dark = responsiveFontSizes(
  createTheme(merge(cloneDeep(baseThemeOptions), options))
);
