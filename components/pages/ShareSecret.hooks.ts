import { useTranslation } from 'next-i18next';
import { Secret } from '@/globals';

export interface Props {
  secret: Secret;
}

const ttlDescriptions = {
  600: '10m',
  3600: '1h',
  86400: '24h',
};

export const useShareSecret = (props: Props) => {
  const {
    secret: { id: secretId, ttl },
  } = props;
  const { t } = useTranslation('secrets');

  const secretUrl = `${window.location.origin}/${secretId}`;
  const ttlDescription = ttlDescriptions[ttl];

  return {
    t,
    secretId,
    secretUrl,
    ttlDescription,
  };
};
