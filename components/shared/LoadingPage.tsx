import React from 'react';
import { Box, Fade, Modal } from '@mui/material';
import InitialPageLogoLoader from './InitialPageLogoLoader';

interface Props {
  logo?: boolean;
}

export const LoadingPage = ({ logo }: Props): JSX.Element => (
  <Modal open>
    <Fade in>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 0,
        }}
      >
        {logo && <InitialPageLogoLoader height={256} width={256} />}
      </Box>
    </Fade>
  </Modal>
);
