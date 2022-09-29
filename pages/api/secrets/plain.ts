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

  const expiresAtDate = new Date();

  expiresAtDate.setTime(expiresAtDate.getTime() + 600 * 1000);

  const token = await bt.tokens.create({
    type: 'token',
    data: req.body,
    // eslint-disable-next-line camelcase
    expires_at: expiresAtDate.toISOString(),
  });

  res.status(200).send(`https://sendsecure.ly/${token.id}`)
};
