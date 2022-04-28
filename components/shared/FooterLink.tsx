import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';

interface FooterLinkProps {
    i18nKey: string,
    linkText: string,
    linkUrl: string
}

export const FooterLink = (props: FooterLinkProps) => {
  const { t } = useTranslation('components');

  const {
      i18nKey,
      linkText,
      linkUrl
  } = props;

  return (
    <Box textAlign="center">
      <Typography color="textSecondary" variant="body2">
        <Trans i18nKey={i18nKey} t={t}>
          {linkText}
          <Link
            href={linkUrl}
            sx={{
              color: '#838383'
            }}
            target="_blank"
          />
        </Trans>
      </Typography>
    </Box>
  );
};
