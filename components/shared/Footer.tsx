import React from 'react';
import Box from '@mui/material/Box';
import { CheckoutGitHub } from '@/components/shared/CheckOutGitHub';
import { ProductHuntBadge } from '@/components/shared/ProductHuntBadge';
import { SecurityInfo } from '@/components/shared/SecurityInfo';
import { TermsOfService } from './TermsOfService';
import { PrivacyPolicy } from './PrivacyPolicy';

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
    <Box mb={4} mt={4} sx={{display: 'inline-flex', justifyContent: 'center', color: '#838383', alignItems: 'center'}}>
      <CheckoutGitHub />
      <Box ml={1} mr={1}>·</Box>
      <TermsOfService/>
      <Box ml={1} mr={1}>·</Box>
      <PrivacyPolicy/>
    </Box>
    <ProductHuntBadge />
  </Box>
);
