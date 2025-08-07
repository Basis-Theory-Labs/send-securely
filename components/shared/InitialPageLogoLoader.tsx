import React from 'react';
import animationData from './animation-data/initial-page-basistheory-loader.json';
import dynamic from 'next/dynamic';

interface Props {
  width?: number;
  height?: number;
}

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const InitialPageLogoLoader = ({
  width,
  height,
}: Props): JSX.Element => (
  <Lottie
    animationData={animationData}
    style={{
      width,
      height,
    }}
  />
);
