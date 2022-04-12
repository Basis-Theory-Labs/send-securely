import { useState } from 'react';
import { useTranslation } from 'next-i18next';

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
