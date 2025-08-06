import React from 'react';
import Lottie from 'lottie-react';
import animationData from './animation-data/initial-page-basistheory-loader.json';

interface Props {
  width?: number;
  height?: number;
}

const InitialPageLogoLoader: React.FC<Props> = ({ width, height }) => (
  <Lottie
    animationData={animationData}
    style={{ width, height }}
  />
);

export default InitialPageLogoLoader;
