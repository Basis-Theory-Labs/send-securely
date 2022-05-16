import React from 'react';
import { Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import RefreshIcon from '@/components/icons/RefreshIcon';
import type { Props } from '@/components/pages/ShareSecret.hooks';
import { useShareSecret } from '@/components/pages/ShareSecret.hooks';
import { CopyButton } from '@/components/shared';
import { Footer } from '@/components/shared/Footer';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';

export const ShareSecret = (props: Props) => {
  const { t, secretUrl, ttlDescription } = useShareSecret(props);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
      >
        <Box mt={7.5}>
          <SendSecurelyLogoWithName />
        </Box>
        <Box
          mb={{
            xs: 8,
            sm: 8,
            md: 15,
          }}
          mt={2}
        >
          <PoweredByBasisTheory />
        </Box>
        <Typography mb={1} variant="h2">
          {t('share.title')}
        </Typography>
        <Typography color="textSecondary" mb={5} variant="body2">
          {t('share.subtitle')}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mb={3}
        >
          <Box mr={2} sx={{ width: '100%' }}>
            <TextField
              inputProps={{
                readOnly: true,
                disabled: true,
                'aria-label': secretUrl,
              }}
              sx={{
                width: '100%',
              }}
              value={secretUrl}
            />
          </Box>
          <CopyButton
            content={secretUrl}
            iconPosition="start"
            id="copy-secret-link-button"
            showCopyText
            size="small"
          />
        </Box>
        <Paper
          color="#070A1B"
          sx={{
            width: '100%',
            padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}`,
            borderRadius: (theme) => `${theme.shape.borderRadius}`,
            border: '1px solid rgba(209, 215, 255, 0.1)',
          }}
        >
          <Typography color="textSecondary" textAlign="left" variant="body2">
            <Trans i18nKey="share.thisLinkWillOnlyBeValid" t={t}>
              {'This link will expire...'}
              {ttlDescription}
              {'The link can only...'}
            </Trans>
          </Typography>
        </Paper>
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => window.location.reload()}
            startIcon={<RefreshIcon />}
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              marginTop: (theme) => theme.spacing(4),
              width: 'fit-content',
            }}
          >
            {t('share.secureAnotherSecret')}
          </Button>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};
