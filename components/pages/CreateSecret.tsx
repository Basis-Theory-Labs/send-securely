import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import _isEmpty from 'lodash/isEmpty';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { Props, useCreateSecret } from '@/components/pages/CreateSecret.hooks';
import { LoadingButton } from '@/components/shared';
import { Footer } from '@/components/shared/Footer';
import { PoweredByBasisTheory } from '@/components/shared/PoweredByBasisTheory';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';
import { ScrollableText } from '@/components/shared/ScrollableText';

export const CreateSecret = (props: Props) => {
  const { t, data, setData, ttl, setTtl, isSubmitting, createSecret } =
    useCreateSecret(props);

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
          mt={1}
        >
          <PoweredByBasisTheory />
        </Box>
        <Typography mb={1} variant="h2">
          {t('create.title')}
        </Typography>
        <Typography color="textSecondary" mb={5} variant="body2">
          {t('create.subtitle')}
        </Typography>
        <ScrollableText
          id="secret-data"
          multiline
          onChange={(event) => setData(event.target.value)}
          placeholder={t('create.placeholder')}
          rows={4.4}
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
            id="secret-expires-in"
            onChange={(event, newTtl) => setTtl(newTtl || ttl)}
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
          id="create-link-button"
          loading={isSubmitting}
          onClick={createSecret}
          size="medium"
          variant="contained"
        >
          {!isSubmitting && t('create.button')}
        </LoadingButton>
      </Box>
      <Footer />
    </Container>
  );
};
