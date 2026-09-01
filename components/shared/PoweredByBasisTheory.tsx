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
        gap={1}
        justifyContent="center"
        sx={{
          opacity: 0.72,
          transition: 'opacity 120ms ease',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <Typography
          sx={{
            color: '#A0A5B3',
            whiteSpace: 'nowrap',
          }}
          variant="body3"
        >
          {t('poweredBy.prefix')}
        </Typography>
        <BasisTheoryLogo />
      </Box>
    </Link>
  );
};
