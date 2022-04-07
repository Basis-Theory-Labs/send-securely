import React from 'react';
import { CreateSecret } from '@/components/pages/CreateSecret';
import { useIndexPage } from '@/components/pages/IndexPage.hooks';
import { ShareSecret } from '@/components/pages/ShareSecret';

const IndexPageC = () => {
  const { isSharePage, secret, onSecretCreated } = useIndexPage();

  return isSharePage ? (
    <ShareSecret secret={secret} />
  ) : (
    <CreateSecret onSecretCreated={onSecretCreated} />
  );
};

export const IndexPage = IndexPageC;
