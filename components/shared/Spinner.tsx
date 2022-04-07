import React from 'react';
import { LottieLoader } from '@/components/shared/LottieLoader';
import animationData from './animation-data/spinner.json';

interface Props {
  width?: number;
  height?: number;
}

export const Spinner = (loaderProps: Props) => (
  <LottieLoader animationData={animationData} {...loaderProps} />
);
