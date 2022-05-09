import { getBasisTheoryClient } from '@/server-side/services/basistheory-service';

export default async (req, res) => {
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
