import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { BasisTheoryLogo } from '@/components/shared/BasisTheoryLogo';

export const PoweredByBasisTheory = () => {
  const { t } = useTranslation('components');

  return (
    <Link href="https://basistheory.com" target="_blank" underline="none">
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        sx={{
          opacity: 0.4,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Typography mr={1} sx={{ color: '#FFFFFF' }} variant="body3">
          {t<string>("poweredBy.prefix")}
        </Typography>
        <BasisTheoryLogo />
      </Box>
    </Link>
  );
};
