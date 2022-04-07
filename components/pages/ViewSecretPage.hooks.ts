import { useState } from 'react';
import { useApi } from '@basis-theory/basis-theory-portal-commons/src/api/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useClientApiFramework } from '@/components/hooks';
import { Secret } from '@/globals';

export const useViewSecretPage = () => {
  const { t } = useTranslation('secrets');
  const clientApiFramework = useClientApiFramework();
  const [secret, setSecret] = useState<string>();
  const [isOpeningSecret, setIsOpeningSecret] = useState<boolean>(false);
  const router = useRouter();
  const secretId = router.query.id;

  const { isValidating } = useApi<Secret>(
    `secrets/${secretId}/details`,
    undefined,
    {
      revalidateOnFocus: false,
    }
  );

  const openSecret = async () => {
    try {
      setIsOpeningSecret(true);
      const { data } = await clientApiFramework.secrets.get({
        id: secretId,
      });
      setSecret(data.data);
    } finally {
      setIsOpeningSecret(false);
    }
  };

  return {
    t,
    isValidating,
    secret,
    openSecret,
    isOpeningSecret,
  };
};
