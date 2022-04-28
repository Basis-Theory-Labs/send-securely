import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';

export const TermsOfService = () => {
  const { t } = useTranslation('components');

  return (
    <Box textAlign="center">
      <Typography color="textSecondary" variant="body2">
        <Trans i18nKey="links.termsOfService" t={t}>
          {'Terms of Service'}
          <Link
            href="https://basistheory.com/terms-of-service"
            sx={{
              color: '#838383'
            }}
            target="_blank"
          >
          </Link>
        </Trans>
      </Typography>
    </Box>
  );
};
