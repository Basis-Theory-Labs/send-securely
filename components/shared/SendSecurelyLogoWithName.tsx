import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { SendSecurelyLogo } from '@/components/shared/SendSecurelyLogo';

export const SendSecurelyLogoWithName = () => {
  const { t } = useTranslation('components');

  return (
    <Link color="inherit" href="/" underline="none">
      <Box alignItems="center" display="flex" justifyContent="center">
        <SendSecurelyLogo />
        <Box ml={2}>
          {' '}
          <Typography variant="h1">{t('logo.appName')}</Typography>
        </Box>
      </Box>
    </Link>
  );
};
