import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

interface FooterLinkProps {
  i18nKey: string;
  linkUrl: string;
}

export const FooterLink = (props: FooterLinkProps) => {
  const { t } = useTranslation('components');

  const { i18nKey, linkUrl } = props;

  return (
    <Box textAlign="center">
      <Typography color="textSecondary" variant="body2">
        <Link
          href={linkUrl}
          sx={{
            color: '#838383',
          }}
          target="_blank"
        >
          {t(i18nKey)}
        </Link>
      </Typography>
    </Box>
  );
};
