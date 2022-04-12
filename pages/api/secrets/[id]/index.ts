import { BasisTheory } from '@basis-theory/basis-theory-js';
import { parseISO, add, getTime } from 'date-fns';
import { env } from '../../../../server-side/env';

export default async (req, res) => {
  const bt = await new BasisTheory().init(env().BT_API_KEY);

  const { id } = req.query;

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
};
