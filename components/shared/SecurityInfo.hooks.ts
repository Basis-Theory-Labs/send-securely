import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useApi } from '@/api-framework/client';
import { useClientApiFramework } from '@/components/hooks';
import { Secret } from '@/globals';

export const useSecurityInfo = () => {
  const { t } = useTranslation('components');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggle = () => setIsExpanded(!isExpanded);

  return {
    t,
    isExpanded,
    toggle,
  };
};
