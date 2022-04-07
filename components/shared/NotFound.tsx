import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { ErrorPage } from './ErrorPage';

const NotFound: FC = () => {
  const { t } = useTranslation('components');

  return (
    <ErrorPage
      caption={t('404.caption')}
      message={t('404.message')}
      status={t('404.status')}
    />
  );
};

export { NotFound };
