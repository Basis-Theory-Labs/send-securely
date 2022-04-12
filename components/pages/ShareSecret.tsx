import React from 'react';
import { Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Trans } from 'next-i18next';
import RefreshIcon from '@/components/icons/RefreshIcon';
import { useShareSecret } from '@/components/pages/ShareSecret.hooks';
import type { Props } from '@/components/pages/ShareSecret.hooks';
import { CopyButton } from '@/components/shared';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SecurityInfo } from '@/components/shared/SecurityInfo';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';

export const ShareSecret = (props: Props) => {
  const { t, secretUrl, ttlDescription } = useShareSecret(props);

  return (
    <Box>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
        >
          <Box mb={20} mt={7.5}>
            <SendSecurelyLogoWithName />
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
              showCopyText
              size="small"
            />
          </Box>
          <Paper
            color="#070A1B"
            sx={{
              height: (theme) => theme.spacing(10),
              width: '100%',
              padding: (theme) => `${theme.spacing(2)} ${theme.spacing(3)}`,
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
              component="a"
              href="/"
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
        <Box mt={4}>
          <SecurityInfo />
        </Box>
        <Box mt={4} mb={7.5}>
          <PoweredByBasisTheory />
        </Box>
      </Container>
    </Box>
  );
};
