import { BasisTheory } from '@basis-theory/basis-theory-js';
import { parseISO, add, getTime } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '@/server-side/env';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const bt = await new BasisTheory().init(env().BT_API_KEY);

    const { id } = req.query;

    if (typeof id !== 'string') {
      res.status(404).json({});

      return;
    }

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
  }
};
