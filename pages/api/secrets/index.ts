import { BasisTheory } from '@basis-theory/basis-theory-js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '@/server-side/env';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const bt = await new BasisTheory().init(env().BT_API_KEY);

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
  }
};
