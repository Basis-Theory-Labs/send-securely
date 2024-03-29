import { useState } from 'react';
import { Secret } from '@/globals';

export const useIndexPage = () => {
  const [secret, setSecret] = useState<Secret>();
  const [isSharePage, setIsSharePage] = useState<boolean>(false);

  const onSecretCreated = (createdSecret: Secret) => {
    setSecret(createdSecret);
    setIsSharePage(true);
  };

  return {
    onSecretCreated,
    isSharePage,
    secret,
  };
};
