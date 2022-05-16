import { parseISO, add, getTime } from 'date-fns';
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
    const datePlusTTL = add(parseISO(token.createdAt), {
      seconds: Number.parseInt(token.metadata.ttl),
    });

    await bt.tokens.delete(id);

    if (getTime(datePlusTTL) > Date.now()) {
      res.status(200).json({ data: token.data });
    } else {
      res.status(404).json({});
    }
  } catch {
    res.status(404).json({});
  }
};
