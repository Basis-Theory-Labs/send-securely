import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { ErrorPage } from './ErrorPage';

const InternalServerError: FC = () => {
  const { t } = useTranslation('components');

  return (
    <ErrorPage
      caption={t('500.caption')}
      message={t('500.message')}
      status={t('500.status')}
    />
  );
};

export { InternalServerError };
