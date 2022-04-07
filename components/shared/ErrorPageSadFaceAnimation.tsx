import React from 'react';
import { LottieLoader } from '@/components/shared/LottieLoader';
import animationData from './animation-data/error-page-sad-face.json';

interface Props {
  width?: number;
  height?: number;
}

export const ErrorPageSadFaceAnimation = (loaderProps: Props) => (
  <LottieLoader animationData={animationData} {...loaderProps} />
);
