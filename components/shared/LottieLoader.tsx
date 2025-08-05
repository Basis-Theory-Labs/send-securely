import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import type { Options, LottieProps } from 'react-lottie';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

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
