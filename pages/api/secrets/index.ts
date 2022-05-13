import type { NextApiRequest, NextApiResponse } from 'next';
import { getBasisTheoryClient } from '@/server-side/services/basistheory-service';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(404).json({
      message: 'Endpoint not found',
    });
  }

  const bt = await getBasisTheoryClient();

  const token = await bt.tokens.create({
    type: 'token',
    data: req.body.data,
    metadata: {
      ttl: req.body.ttl,
    },
  });

  res.status(200).json({
    id: token.id,
    ttl: req.body.ttl,
  });
};
