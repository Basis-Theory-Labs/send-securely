import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';

export const CheckoutGitHub = () => {
  const { t } = useTranslation('components');

  return (
    <Box textAlign="center">
      <Typography color="textSecondary" variant="body2">
        <Trans i18nKey="github.link" t={t}>
          {'Check out our GitHub...'}
          <Link
            href="https://github.com/Basis-Theory-Labs/send-securely"
            sx={{ color: '#8B92B6', textDecoration: 'underline' }}
            target="_blank"
          >
            {'repository'}
          </Link>
          {'.'}
        </Trans>
      </Typography>
    </Box>
  );
};
