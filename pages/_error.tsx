import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import { useRouter } from 'next/router';
import { LoadingPage } from '@/components/shared/LoadingPage';

const Error = ({ statusCode }: ErrorProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const redirect = async (): Promise<void> => {
      if (statusCode === 404 || statusCode === 403) {
        await router.replace('/404');
        router.reload();
      } else {
        await router.replace('/500');
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
