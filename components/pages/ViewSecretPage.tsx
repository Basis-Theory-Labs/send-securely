import React from 'react';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useViewSecretPage } from '@/components/pages/ViewSecretPage.hooks';
import { CopyButton, LoadingButton } from '@/components/shared';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SecurityInfo } from '@/components/shared/SecurityInfo';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';

export const ViewSecretPage = () => {
  const { t, isValidating, secret, openSecret, isOpeningSecret } =
    useViewSecretPage();

  if (isValidating) return null;

  return (
    <Box textAlign="center">
      <Container maxWidth="sm">
        <Box mt={7.5} mb={20}>
          <SendSecurelyLogoWithName />
        </Box>
        <Box mb={1}>
          <Typography variant="h2">{t('somebodySentSecret')}</Typography>
        </Box>
        <Box mb={4}>
          <Typography color="textSecondary" variant="body2">
            {t('clickToOpen')}
          </Typography>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="column" mt={4}>
          {secret ? (
            <Paper sx={{ width: '100%' }} variant="outlined">
              <Box pb={1.5} pt={5}>
                <Box mb={3}>
                  <Typography
                    sx={{
                      fontFamily: 'Source Code Pro',
                      fontSize: '23px',
                    }}
                  >
                    {secret}
                  </Typography>
                </Box>
                <CopyButton
                  content={secret}
                  iconPosition="start"
                  showCopyText
                  size="small"
                />
              </Box>
            </Paper>
          ) : (
            <Paper sx={{ width: '100%' }} variant="outlined">
              <Box py={5}>
                <LoadingButton
                  loading={isOpeningSecret}
                  onClick={openSecret}
                  variant="contained"
                >
                  <Box alignItems="center" display="flex">
                    <VisibilityIcon />
                    <Box ml={1}>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                        }}
                      >
                        {t('openSecret')}
                      </Typography>
                    </Box>
                  </Box>
                </LoadingButton>
              </Box>
            </Paper>
          )}
        </Box>
        <Box mt={4}>
          <SecurityInfo />
        </Box>
        <Box mt={4}>
          <PoweredByBasisTheory />
        </Box>
      </Container>
    </Box>
  );
};
