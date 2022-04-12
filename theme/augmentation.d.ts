import type { CSSProperties } from 'react';

type Accent<T> = {
  accent100: T;
  accent200: T;
  accent300: T;
  accent400: T;
  accent500: T;
  accent600: T;
  accent700: T;
};

type TextColor<T> = {
  textPrimary: T;
  textSecondary: T;
};

type Grey<T> = {
  grey50: T;
  grey100: T;
  grey200: T;
  grey300: T;
  grey400: T;
  grey500: T;
  grey600: T;
  grey700: T;
  grey800: T;
  grey900: T;
  grey1000: T;
};

interface CustomTypography<T> {
  body3: T;
  subtitle3: T;
  subtitle4: T;
  code: T;
}

declare module '@mui/material' {
  interface Palette
    extends Accent<Palette['primary']>,
      TextColor<Palette['primary']>,
      Grey<Palette['primary']> {}
  interface PaletteOptions
    extends Accent<PaletteOptions['primary']>,
      TextColor<PaletteOptions['primary']>,
      Grey<PaletteOptions['primary']> {}
  interface ButtonPropsColorOverrides
    extends Accent<true>,
      TextColor<true>,
      Grey<true> {}
  interface IconButtonPropsColorOverrides
    extends Accent<true>,
      TextColor<true>,
      Grey<true> {}

  interface Color {
    '1000': string;
  }

  /* eslint-disable @typescript-eslint/no-empty-interface */
  interface TypographyVariants extends CustomTypography<CSSProperties> {}

  interface TypographyVariantsOptions
    extends CustomTypography<CSSProperties | undefined> {}

  interface TypographyPropsVariantOverrides extends CustomTypography<true> {}
  /* eslint-enable @typescript-eslint/no-empty-interface */
}

export {};
