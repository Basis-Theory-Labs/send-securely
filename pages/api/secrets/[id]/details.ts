import type { NextApiRequest, NextApiResponse } from 'next';
import { getBasisTheoryClient } from '@/server-side/services/basistheory-service';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(404).json({
      message: 'Endpoint not found',
    });
  }

  const bt = await getBasisTheoryClient();

  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(404).json({});

    return;
  }

  try {
    const token = await bt.tokens.retrieve(id);

    res.status(200).json({
      id: token.id,
    });
  } catch {
    res.status(404).json({});
  }
};
