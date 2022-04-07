import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { BasisTheoryLogo } from '@/components/shared/BasisTheoryLogo';
import { ErrorPageSadFaceAnimation } from '@/components/shared/ErrorPageSadFaceAnimation';
import { Glow } from '@/components/shared/Glow';
import { useStyles } from './styles/ErrorPage.styles';

interface Props {
  status: ReactElement;
  message: ReactElement;
  caption: ReactElement;
}

export const ErrorPage = ({ status, message, caption }: Props) => {
  const { t: tc } = useTranslation('common');
  const classes = useStyles();

  return (
    <>
      <Glow />
      <Box
        alignContent="center"
        display="flex"
        flexDirection="column"
        height="100vh"
        justifyContent="center"
        textAlign="center"
        width="100vw"
      >
        <header>
          <AppBar className={classes.header} color="transparent" elevation={0}>
            <Toolbar>
              <Box
                display="flex"
                justifyContent="space-between"
                mx={16}
                width="100vw"
              >
                <BasisTheoryLogo />
                <Box display="flex" flexDirection="row">
                  <Box px={1}>
                    <Button href="/" variant="text">
                      {tc('home')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </header>
        <Box mt={-12}>
          <ErrorPageSadFaceAnimation height={300} width={300} />
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            mt={-8}
          >
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
      </Box>
    </>
  );
};
