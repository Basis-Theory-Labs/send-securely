import { BasisTheory } from '@basis-theory/basis-theory-js';
import { getTime, add, formatISO } from 'date-fns';
import {env} from "../../../server-side/env";
// import { zonedTimeToUtc, getTimeZoneValue } from 'date-fns-tz'

const doSearch = async (bt, ttl, page) => {
    const datePlusTTL = add(getTime(new Date(new Date().toUTCString())), {seconds: ttl * -1});
    const query = `(metadata.ttl:${ttl} AND created_at: {* TO ${formatISO(datePlusTTL)}})`;

   return bt.tokens.search({
        query,
        page: 1,
        size: 100
      })
}

export default async function handler(req, res) {
  const bt = await new BasisTheory().init(env().BT_API_KEY);

  const {id} = req.query;
  const ttls = [60, 600, 3600, 86400];

  const tokensArrays = await Promise.all(ttls.map(ttl => {
    return doSearch(bt, ttl, 1).then(res => {
        return [res.data, new Array(res.pagination.totalPages)
            .map((page, index) => doSearch(bt, ttl, index + 2)
            .then(res => res.data))]
    });
    }));

  const tokens = tokensArrays.flat().flat();

  res.status(200).json(tokens)
}

