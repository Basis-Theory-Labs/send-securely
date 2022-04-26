import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { ErrorPageSadFaceAnimation } from '@/components/shared/ErrorPageSadFaceAnimation';
import { SendSecurelyLogoWithName } from '@/components/shared/SendSecurelyLogoWithName';

interface Props {
  status: ReactElement;
  message: ReactElement;
  caption: ReactElement;
}

export const ErrorPage = ({ status, message, caption }: Props) => {
  const { t: tc } = useTranslation('common');

  return (
    <Box textAlign="center">
      <Box mb={20} mt={7.5}>
        <SendSecurelyLogoWithName />
      </Box>
      <Box alignItems="center" display="flex" flexDirection="column" mt={-8}>
        <Typography variant="h1">{status}</Typography>
        <Typography variant="h4">{message}</Typography>
        <Grid item sm={4}>
          <Box mt={1}>
            <Typography color="textSecondary" variant="body1">
              {caption}
            </Typography>
            <Box mt={4}>
              <Button color="primary" href="/" variant="contained">
                {tc('goToHome')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
