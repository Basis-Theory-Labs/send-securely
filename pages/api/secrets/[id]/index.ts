import { parseISO, add, getTime } from 'date-fns';
import { getBasisTheoryClient } from '@/server-side/services/basistheory-service';

export default async (req, res) => {
  const bt = await getBasisTheoryClient();

  const { id } = req.query;

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
