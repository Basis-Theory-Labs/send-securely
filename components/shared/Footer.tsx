import React from 'react';
import Box from '@mui/material/Box';
import { ProductHuntBadge } from '@/components/shared/ProductHuntBadge';
import { SecurityInfo } from '@/components/shared/SecurityInfo';
import { FooterLink } from './FooterLink';

export const Footer = () => (
  <Box
    component="footer"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    mb={5}
    mt={4}
    textAlign="center"
  >
    <SecurityInfo />
    <Box
      mb={4}
      mt={4}
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        color: '#838383',
        alignItems: 'center',
      }}
    >
      <FooterLink
        i18nKey="github.link"
        linkUrl="https://github.com/Basis-Theory-Labs/send-securely"
      />
      <Box ml={1} mr={1}>
        {'·'}
      </Box>
      <FooterLink
        i18nKey="links.termsOfService"
        linkUrl="https://basistheory.com/resources/terms-of-service"
      />
      <Box ml={1} mr={1}>
        {'·'}
      </Box>
      <FooterLink
        i18nKey="links.privacyPolicy"
        linkUrl="https://basistheory.com/resources/privacy-policy"
      />
    </Box>
    <ProductHuntBadge />
  </Box>
);
