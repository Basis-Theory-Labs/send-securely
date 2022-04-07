import React from 'react';
import Box from '@mui/material/Box';
import Lottie from 'react-lottie';
import type { Options, LottieProps } from 'react-lottie';
import animationData from './animation-data/glow.json';

type Props = Omit<Options, 'animationData'> & Omit<LottieProps, 'options'>;

export const Glow = ({
  loop = true,
  autoplay = true,
  rendererSettings,
  ...rest
}: Props) => (
  <Box height={200} position="absolute" top={-165} width="100vw" zIndex={-1}>
    <Lottie
      options={{
        animationData,
        loop,
        autoplay,
        rendererSettings,
      }}
      style={{
        filter: 'blur(60px)',
        opacity: 0.5,
      }}
      {...rest}
    />
  </Box>
);
