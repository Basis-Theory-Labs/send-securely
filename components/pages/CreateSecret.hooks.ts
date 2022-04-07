import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useClientApiFramework } from '@/components/hooks';
import { Secret } from '@/globals';

export interface Props {
  onSecretCreated: (secret: Secret) => void;
}

export const useCreateSecret = ({ onSecretCreated }: Props) => {
  const { t } = useTranslation('secrets');
  const [ttl, setTtl] = useState<string>('600');
  const [data, setData] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const clientApiFramework = useClientApiFramework();

  const createSecret = async () => {
    try {
      setIsSubmitting(true);

      const { data: secret } = await clientApiFramework.secrets.create({
        ttl: Number(ttl),
        data,
      });

      onSecretCreated(secret);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    t,
    ttl,
    setTtl,
    data,
    setData,
    isSubmitting,
    setIsSubmitting,
    createSecret,
  };
};
