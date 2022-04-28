import React from 'react';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { useViewSecretPage } from '@/components/pages/ViewSecretPage.hooks';
import { CopyButton, LoadingButton } from '@/components/shared';
import { Footer } from '@/components/shared/Footer';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';

export const ViewSecretPage = () => {
  const { t, isValidating, secret, openSecret, isOpeningSecret } =
    useViewSecretPage();

  if (isValidating) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <>
      <Head>
        <meta
          content="You were sent a secret!"
          key="description"
          name="description"
        />
        <meta
          content="You were sent a secret!"
          key="og:description"
          property="og:description"
        />
        <meta
          content="https://cdn.basistheory.com/images/seo/sendsecurely-secret-opengraph.png"
          key="og:image"
          property="og:image"
        />
        <meta
          content="You were sent a secret!"
          key="twitter:description"
          property="twitter:description"
        />
        <meta
          content="https://cdn.basistheory.com/images/seo/sendsecurely-secret-opengraph.png"
          key="twitter:image"
          property="twitter:image"
        />
      </Head>
      <Box textAlign="center">
        <Container maxWidth="sm">
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
            {t('view.title')}
          </Typography>
          <Typography color="textSecondary" mb={4} variant="body2">
            {t('view.subtitle')}
          </Typography>
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
                          {t('view.button')}
                        </Typography>
                      </Box>
                    </Box>
                  </LoadingButton>
                </Box>
              </Paper>
            )}
          </Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
};
