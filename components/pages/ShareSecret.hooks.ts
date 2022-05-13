import { useTranslation } from 'next-i18next';
import { Secret } from '@/globals';

interface Props {
  secret: Secret;
}

const ttlDescriptions = {
  600: '10m',
  3600: '1h',
  86400: '24h',
};

const useShareSecret = (props: Props) => {
  const {
    secret: { id: secretId, ttl },
  } = props;
  const { t } = useTranslation('secrets');

  const { href } = window.location;

  const secretUrl = `${href.replace(/\/$/u, '')}/${secretId}`;
  const ttlDescription = ttlDescriptions[ttl];

  return {
    t,
    secretId,
    secretUrl,
    ttlDescription,
  };
};

export { useShareSecret };
export type { Props };
