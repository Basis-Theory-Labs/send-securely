import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import { useRouter } from 'next/router';
import { LoadingPage } from '@/components/shared/LoadingPage';

const Error = ({ statusCode }: ErrorProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const redirect = (): void => {
      if (statusCode === 404 || statusCode === 403) {
        window.location.href = `${router.locale}/404`;
      } else {
        window.location.href = `${router.locale}/500`;
      }
    };

    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingPage />;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = err?.statusCode || res?.statusCode || 500;

  return {
    statusCode,
  };
};

export default Error;
