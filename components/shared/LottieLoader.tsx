import React, { FC } from 'react';
import Lottie from 'react-lottie';
import type { Options, LottieProps } from 'react-lottie';

type Props = Omit<Options, 'loop' | 'autoplay' | 'rendererSettings'> &
  Omit<LottieProps, 'options'>;

export const LottieLoader: FC<Props> = ({ animationData, ...rest }) => (
  <Lottie
    isClickToPauseDisabled
    options={{
      animationData,
      loop: true,
      autoplay: true,
    }}
    {...rest}
  />
);
