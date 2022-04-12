import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export const ChevronRight = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      clipRule="evenodd"
      d="M9.46967 7.46967C9.76256 7.17678 10.2374 7.17678 10.5303 7.46967L14.5303 11.4697C14.8232 11.7626 14.8232 12.2374 14.5303 12.5303L10.5303 16.5303C10.2374 16.8232 9.76256 16.8232 9.46967 16.5303C9.17678 16.2374 9.17678 15.7626 9.46967 15.4697L12.9393 12L9.46967 8.53033C9.17678 8.23744 9.17678 7.76256 9.46967 7.46967Z"
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default ChevronRight;
