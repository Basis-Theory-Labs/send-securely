import React from 'react';
import type { ErrorProps } from 'next/error';
import { NetworkError } from '@/proxy/NetworkError';

interface Props {
  /**
   * Component to render with status code when NetworkError is caught
   */
  Component: React.ComponentType<ErrorProps>;
}

interface State {
  error?: unknown;
}

/**
 * Renders props.Component if a NetworkError is caught <br/>
 * Useful for consistently render _error.tsx in dev/prod
 */
export class NetworkErrorBoundary extends React.Component<
  React.PropsWithChildren<Props>,
  State
> {
  public constructor(props: React.PropsWithChildren<Props>) {
    super(props);
    this.state = {};
  }

  public componentDidCatch(error: Error): void {
    this.setState({
      error: error as NetworkError,
    });
  }

  public render(): React.ReactNode {
    const { Component, children } = this.props;
    const { error } = this.state;

    if (error instanceof NetworkError) {
      return <Component statusCode={error.statusCode} />;
    }

    return children;
  }
}
