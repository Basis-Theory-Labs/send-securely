import React from 'react';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import { Spinner } from './Spinner';

interface Props extends ButtonProps {
  loading?: boolean;
}

export const LoadingButton = ({
  loading,
  children,
  startIcon,
  disabled,
  ...buttonProps
}: Props) => (
  <Button
    disabled={loading || disabled}
    startIcon={loading ? <Spinner height={24} /> : startIcon}
    {...buttonProps}
  >
    {children}
  </Button>
);
