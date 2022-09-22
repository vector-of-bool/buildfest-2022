import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { createMethodHandler } from "../../../utils/handle"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // GRAB ID FROM req.query (where next stores params)
    const id: string = decodeURIComponent(req.query.id as string)

    // Potential Responses for /links/:id
    const handler = createMethodHandler({
        // RESPONSE FOR GET REQUESTS
        async get(req: NextApiRequest, res: NextApiResponse) {
            const { MoLink } = await connect() // connect to database
            var found = await MoLink.findOne({ alias: id });
            if (found == null) {
                res.status(404).json({})
            } else {
                res.json(found)
            }
        },
        // RESPONSE PUT REQUESTS
        async put(req: NextApiRequest, res: NextApiResponse) {
            const { MoLink } = await connect() // connect to database
            res.json(
                await MoLink.findOneAndUpdate({ alias: id }, req.body, { new: true })
            )
        },
        // RESPONSE FOR DELETE REQUESTS
        async delete(req: NextApiRequest, res: NextApiResponse) {
            const { MoLink } = await connect() // connect to database
            res.json(await MoLink.deleteOne({ alias: id }).catch(catcher))
        },
    });

    return handler(req, res);
}

export default handler;
