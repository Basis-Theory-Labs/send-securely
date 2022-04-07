import React from 'react';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useStyles from '@/components/pages/styles/Footer.styles';

export const FooterInfo = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.customPlansPaper}>
      <Box display="flex" flexDirection="row" p={2}>
        <Box>
          <img src="/secret-share-icon.png" width="48px" height="48px" />
        </Box>
        <Box sx={{ textAlign: 'left' }} ml={2.5}>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            How did we make it secure?
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            Learn more about securing data with{' '}
            <Link target="_blank" href="https://developers.basistheory.com">
              Basis Theory
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
