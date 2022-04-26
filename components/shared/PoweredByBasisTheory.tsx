import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { BasisTheoryLogo } from '@/components/shared/BasisTheoryLogo';

export const PoweredByBasisTheory = () => {
  const { t } = useTranslation('components');

  return (
    <Box alignItems="center" display="flex" justifyContent="center">
      <Typography sx={{ color: '#6A6A6A' }} variant="body3">
        {t('poweredBy.prefix')}
      </Typography>
      <Button href="https://basistheory.com" target="_blank">
        <BasisTheoryLogo />
      </Button>
    </Box>
  );
};
