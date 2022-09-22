import { NextApiResponse } from "next";
import { connect } from "../../../utils/connection"
import { getAll, openLinksCollection, withClient, withLinksCollection } from "../../../utils/db";
import { createMethodHandler } from "../../../utils/handle"
import { MoLinkJSON, MoLinkPutJSON } from "../../../utils/types";

export default createMethodHandler({
  async get(req, resp: NextApiResponse<MoLinkJSON[]>) {
    await withLinksCollection(async coll => {
      const links = await getAll(coll.find().sort({ n: -1 }).limit(100));
      const json: MoLinkJSON[] = links.map(m => ({
        ...m,
        _id: m._id.toHexString(),
        createdAt: m.createdAt.toString(),
      }))
      resp.json(json);
    });
  },
  async post(req, resp: NextApiResponse<{ error?: string }>) {
    const doc: MoLinkPutJSON = req.body;
    doc.n = 0; // Initial use-count is zero
    if (!doc.link || !doc.alias) {
      return resp.status(400).json({ error: 'Missing one or more required properties' });
    }
    const dbDoc = {
      alias: doc.alias,
      link: doc.link,
      createdAt: new Date(),
      n: 0
    }
    await withLinksCollection(async coll => {
      return await coll.insertOne(dbDoc);
    });
    resp.status(202).json({});
  },
});
