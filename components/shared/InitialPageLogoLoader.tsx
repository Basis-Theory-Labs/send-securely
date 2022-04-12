import React from 'react';
import Lottie from 'lottie-react';
import animationData from './animation-data/initial-page-basistheory-loader.json';

interface Props {
  width?: number;
  height?: number;
}

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
