import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { LottieComponentProps } from "lottie-react";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const LottieLoader: FC<LottieComponentProps> = ({ animationData, ...rest }) => (
  <Lottie
    loop={true}
    autoplay={true}
    animationData={animationData}
    {...rest}
  />
);
