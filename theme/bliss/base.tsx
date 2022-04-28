import React from 'react';
import type { ThemeOptions } from '@mui/material';
import CheckCircleIcon from '../../components/icons/CheckCircleIcon';
import ErrorIcon from '../../components/icons/ErrorIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import WarningIcon from '../../components/icons/WarningIcon';

const spacing = 8;
const toolbarHeight = spacing * 9;

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['Inter'].join(','),
    h1: {
      fontFamily: 'Inter',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 42 / 34,
      letterSpacing: '0.25px',
    },
    h2: {
      fontFamily: 'Inter',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 32 / 24,
      letterSpacing: '0px',
    },
    subtitle1: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 28 / 16,
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 22 / 14,
      letterSpacing: '0.1px',
    },
    subtitle3: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 16 / 12,
      letterSpacing: '0.1px',
    },
    subtitle4: {
      fontSize: '10px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 13 / 10,
      letterSpacing: '0.1px',
    },
    body1: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 24 / 16,
      letterSpacing: '0.15px',
    },
    body2: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 20 / 14,
      letterSpacing: '0px',
    },
    body3: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 17 / 12,
      letterSpacing: '0px',
    },
    button: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 24 / 14,
      letterSpacing: '0px',
      textTransform: 'none',
    },
    caption: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 20 / 12,
      letterSpacing: '0.4px',
    },
    overline: {
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 32 / 12,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
    code: {
      fontFamily: 'Source Code Pro',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 14 / 12,
      letterSpacing: '0.1px',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontSize: '14px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: toolbarHeight,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        outlined: {
          borderWidth: '2px !important', // only way to override for all sub styles and keep consistency
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingTop: '12px',
          paddingBottom: '12px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'flex',
          justifyContent: 'center',
          background: 'transparent',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        spacing: {
          padding: `${spacing * 2}px ${spacing * 3}px`,
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon viewBox="-2 -2 24 24" />,
          warning: <WarningIcon viewBox="-2 -2 24 24" />,
          success: <CheckCircleIcon viewBox="-2 -2 24 24" />,
          error: <ErrorIcon viewBox="-2 -2 24 24" />,
        },
      },
      styleOverrides: {
        root: {
          padding: `${spacing * 1.5}px ${spacing * 2}px`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
        sizeSmall: {
          padding: `${spacing * 1.5}px ${spacing * 2}px`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          cursor: 'pointer',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        sizeSmall: {
          padding: `${spacing * 0.5}px ${spacing}px`,
        },
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: toolbarHeight,
    },
  },
};
