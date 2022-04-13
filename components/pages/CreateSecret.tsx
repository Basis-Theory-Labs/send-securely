import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import _isEmpty from 'lodash/isEmpty';
import Head from 'next/head';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { Props, useCreateSecret } from '@/components/pages/CreateSecret.hooks';
import { LoadingButton } from '@/components/shared';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SecurityInfo } from '@/components/shared/SecurityInfo';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';

export const CreateSecret = (props: Props) => {
  const { t, data, setData, ttl, setTtl, isSubmitting, createSecret } =
    useCreateSecret(props);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          content="One time link to share passwords, keys, and other sensitive data."
          name="description"
        />
        <meta
          content="Send Securely - Send your secret, securely."
          property="og:title"
        />
        <meta
          content="One time link to share passwords, keys, and other sensitive data."
          property="og:description"
        />
        <meta
          content="https://cdn.basistheory.com/images/seo/bt-opengraph.png"
          property="og:image"
        />
        <meta
          content="Send Securely - Send your secret, securely."
          property="twitter:title"
        />
        <meta
          content="Send your secret, securely. One time link to share passwords, keys, and other sensitive data."
          property="twitter:description"
        />
        <meta
          content="https://cdn.basistheory.com/images/seo/bt-opengraph.png"
          property="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <Box>
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Box mt={7.5} mb={{xs: 8, sm: 8, md: 20}}>
              <SendSecurelyLogoWithName />
            </Box>
            <Typography mb={1} variant="h2">
              {t('create.title')}
            </Typography>
            <Typography color="textSecondary" mb={5} variant="body2">
              {t('create.subtitle')}
            </Typography>
            <TextField
              multiline
              onChange={(event) => setData(event.target.value)}
              placeholder="Passwords, credentials, API Keys or anything..."
              rows={4}
              sx={{ fontFamily: 'Source Code Pro', fontWeight: 500, color: '969EC2' }}
              InputLabelProps={{
                style: { color: '#969EC2' }, 
             }}
            />
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              justifyContent="right"
              my={3}
            >
              <Box mr={2}>
                <Typography color="textSecondary" variant="body2">
                  {t('create.secretExpiresAfter')}
                </Typography>
              </Box>
              <ToggleButtonGroup
                color="primary"
                exclusive
                onChange={(event, newTtl) => setTtl(newTtl)}
                value={ttl}
              >
                <ToggleButton
                  size="small"
                  sx={{
                    padding: (theme) =>
                      `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
                    minWidth: '45px',
                  }}
                  value="600"
                >
                  {'10m'}
                </ToggleButton>
                <ToggleButton
                  size="small"
                  sx={{
                    padding: (theme) =>
                      `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
                    minWidth: '45px',
                  }}
                  value="3600"
                >
                  {'1h'}
                </ToggleButton>
                <ToggleButton
                  size="small"
                  sx={{
                    padding: (theme) =>
                      `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
                    minWidth: '45px',
                  }}
                  value="86400"
                >
                  {'24h'}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <LoadingButton
              color="primary"
              disabled={_isEmpty(data) || isSubmitting}
              endIcon={!isSubmitting && <ChevronRightIcon />}
              loading={isSubmitting}
              onClick={createSecret}
              size="medium"
              variant="contained"
            >
              {!isSubmitting && <Typography>{t('create.button')}</Typography>}
            </LoadingButton>
          </Box>
          <Box mt={4}>
            <SecurityInfo />
          </Box>
          <Box mt={4} mb={7.5}>
            <PoweredByBasisTheory />
          </Box>
        </Container>
      </Box>
    </>
  );
};
