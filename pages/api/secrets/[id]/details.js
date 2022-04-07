import {BasisTheory} from '@basis-theory/basis-theory-js';
import {parseISO, add, getTime} from "date-fns";
import {env} from "../../../../server-side/env";

export default async function handler(req, res) {
    const bt = await new BasisTheory().init(env().BT_API_KEY);

    const {id} = req.query;
    console.log("retrieving token", id);

    try {
        const token = await bt.tokens.retrieve(id);
        const datePlusTTL = add(parseISO(token.createdAt), {seconds: token.metadata.ttl});

        if (getTime(datePlusTTL) > Date.now()) {
            res.status(200).json({id: token.id, timeLeft: datePlusTTL});
        } else {
            await bt.tokens.delete(id);
            res.status(404).json({})
        }
    } catch {
        res.status(404).json({});
    }

}
