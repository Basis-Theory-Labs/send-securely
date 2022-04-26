import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { BasisTheoryLogo } from '@/components/shared/BasisTheoryLogo';

export const PoweredByBasisTheory = () => {
  const { t } = useTranslation('components');

  return (
    <Button href="https://basistheory.com" target="_blank">
      <Box alignItems="center" display="flex" justifyContent="center">
        <Typography mr={1} sx={{ color: '#6A6A6A' }} variant="body3">
          {t('poweredBy.prefix')}
        </Typography>
        <BasisTheoryLogo />
      </Box>
    </Button>
  );
};
