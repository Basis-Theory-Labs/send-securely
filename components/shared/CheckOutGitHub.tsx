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
          {'Github'}
          <Link
            href="https://github.com/Basis-Theory-Labs/send-securely"
            sx={{
              color: '#838383'
            }}
            target="_blank"
          />
        </Trans>
      </Typography>
    </Box>
  );
};
