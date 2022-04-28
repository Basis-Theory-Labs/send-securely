import React from 'react';
import Box from '@mui/material/Box';
import { CheckoutGitHub } from '@/components/shared/CheckOutGitHub';
import { ProductHuntBadge } from '@/components/shared/ProductHuntBadge';
import { SecurityInfo } from '@/components/shared/SecurityInfo';

export const Footer = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    mb={5}
    mt={4}
    textAlign="center"
  >
    <SecurityInfo />
    <Box mb={4} mt={4}>
      <CheckoutGitHub />
    </Box>
    <ProductHuntBadge />
  </Box>
);
