import React, { useEffect } from 'react';
import { LoadingPage } from '@basis-theory/basis-theory-portal-commons/src/components/LoadingPage';
import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';

const Error = ({ statusCode }: ErrorProps): JSX.Element => {
  useEffect(() => {
    const redirect = (): void => {
      if (statusCode === 404 || statusCode === 403) {
        window.location.href = '/404';
      } else {
        window.location.href = '/500';
      }
    };

    redirect();
  }, [statusCode]);

  return <LoadingPage />;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = err?.statusCode || res?.statusCode || 500;

  return {
    statusCode,
  };
};

export default Error;
