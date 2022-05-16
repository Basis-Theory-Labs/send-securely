import { staticApi } from '@/api-framework/server';

export default staticApi('Healthz', {
  status: 'ok',
});
