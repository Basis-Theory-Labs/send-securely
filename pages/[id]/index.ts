import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'components',
      'secrets',
    ])),
  },
});

export { ViewSecretPage as default } from '@/components/pages/ViewSecretPage';
export { getStaticPaths, getStaticProps };
