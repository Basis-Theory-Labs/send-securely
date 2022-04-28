import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('components');

  return (
    <Box textAlign="center">
      <Typography color="textSecondary" variant="body2">
        <Trans i18nKey="links.privacyPolicy" t={t}>
          {'Privacy Policy'}
          <Link
            href="https://basistheory.com/privacy-policy"
            sx={{
              color: '#838383'
            }}
            target="_blank"
          >
            {'Privacy Policy'}
          </Link>
        </Trans>
      </Typography>
    </Box>
  );
};
