import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { BasisTheoryLogo } from '@/components/shared/BasisTheoryLogo';

export const PoweredByBasisTheory = () => {
  const { t } = useTranslation('secrets');

  return (
    <Box alignItems="center" display="flex" justifyContent="center">
      <Typography color="textSecondary" variant="body3">
        {t('poweredBy')}
      </Typography>
      <Button href="https://basistheory.com" target="_blank">
        <BasisTheoryLogo />
      </Button>
    </Box>
  );
};
