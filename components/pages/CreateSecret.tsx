import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import _isEmpty from 'lodash/isEmpty';
import { Props, useCreateSecret } from '@/components/pages/CreateSecret.hooks';
import { LoadingButton } from '@/components/shared';
import { GoldenFrame } from '@/components/shared/GoldenFrame';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SendSecurelyLogo } from '@/components/shared/SendSecurelyLogo';

export const CreateSecret = (props: Props) => {
  const { t, data, setData, ttl, setTtl, isSubmitting, createSecret } =
    useCreateSecret(props);

  return (
    <Box>
      <Box position="absolute" right={0} top={0}>
        <GoldenFrame />
      </Box>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
        >
          <Box mt={10} mb={19.5}>
            <SendSecurelyLogo />
            <Typography color="textSecondary">SendSecure.ly</Typography>
          </Box>
          <Typography
            mb={1}
            sx={{
              fontSize: '24px',
              fontWeight: 500,
            }}
          >
            {t('sendSecretSecurely')}
          </Typography>
          <Typography color="textSecondary" mb={5}>
            {t('oneTimeLink')}
          </Typography>
          <TextField
            multiline
            onChange={(event) => setData(event.target.value)}
            placeholder="Passwords, credentials, API Keys or anything..."
            rows={4}
          />
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            my={2.5}
          >
            <Typography color="textSecondary">
              {t('secretExpiresAfter')}
            </Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              onChange={(event, newTtl) => setTtl(newTtl)}
              value={ttl}
            >
              <ToggleButton
                sx={{
                  padding: (theme) => `${theme.spacing(1)} ${theme.spacing(3)}`,
                }}
                value="600"
              >
                {'10m'}
              </ToggleButton>
              <ToggleButton
                sx={{
                  padding: (theme) => `${theme.spacing(1)} ${theme.spacing(3)}`,
                }}
                value="3600"
              >
                {'1h'}
              </ToggleButton>
              <ToggleButton
                sx={{
                  padding: (theme) => `${theme.spacing(1)} ${theme.spacing(3)}`,
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
            loading={isSubmitting}
            onClick={createSecret}
            variant="contained"
          >
            {t('createLink')}
          </LoadingButton>
        </Box>
        <Box mt={2}>
          <PoweredByBasisTheory />
        </Box>
      </Container>
    </Box>
  );
};
