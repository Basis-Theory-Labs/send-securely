import React from 'react';
import { Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Trans, useTranslation } from 'next-i18next';
import RefreshIcon from '@/components/icons/RefreshIcon';
import { FooterInfo } from '@/components/pages/FooterInfo';
import { useShareSecret } from '@/components/pages/ShareSecret.hooks';
import { CopyButton } from '@/components/shared';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { Secret } from '@/globals';

interface Props {
  secret: Secret;
}

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
          <Box mt={10} mb={19.5}>
            <PoweredByBasisTheory />
          </Box>
          <Typography
            mb={1}
            sx={{
              fontSize: '24px',
              fontWeight: 500,
            }}
          >
            {t('shareLink')}
          </Typography>
          <Typography color="textSecondary" mb={5}>
            {t('oneTimeLink')}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            mb={3}
            justifyContent="space-between"
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
            <Typography color="textSecondary" textAlign="left">
              <Trans i18nKey="thisLinkWillBeDestroyed" t={t}>
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
              {t('secureAnotherSecret')}
            </Button>
          </Box>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          mb={8}
          mt={19.5}
        >
          <FooterInfo />
        </Box>
      </Container>
    </Box>
  );
};
