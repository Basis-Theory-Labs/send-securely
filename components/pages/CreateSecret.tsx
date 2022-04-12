import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import _isEmpty from 'lodash/isEmpty';
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
            sx={{ fontFamily: 'Source Code Pro' }}
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
            endIcon={<ChevronRightIcon />}
            loading={isSubmitting}
            onClick={createSecret}
            size="large"
            variant="contained"
          >
            {t('create.button')}
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
  );
};
