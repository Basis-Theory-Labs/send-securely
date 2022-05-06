import { BasisTheory } from '@basis-theory/basis-theory-js';
import { parseISO, add, getTime } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '@/server-side/env';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(404).json({
      message: 'Endpoint not found',
    });
  }

  const bt = await new BasisTheory().init(env().BT_API_KEY);

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

    if (getTime(datePlusTTL) > Date.now()) {
      res.status(200).json({
        id: token.id,
        timeLeft: datePlusTTL,
      });
    } else {
      await bt.tokens.delete(id);
      res.status(404).json({});
    }
  } catch {
    res.status(404).json({});
  }
};
