import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { BasisTheoryLogo } from '@/components/shared/BasisTheoryLogo';

export const PoweredByBasisTheory = () => {
  const { t } = useTranslation('secrets');

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
    >
      <Typography color="textSecondary" variant="body2">
        {t('poweredBy')}
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button href="https://basistheory.com" target="_blank">
          <BasisTheoryLogo />
        </Button>
      </Box>
    </Box>
  );
};
