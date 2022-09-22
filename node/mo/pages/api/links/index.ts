import { connect } from "../../../utils/connection"
import { createMethodHandler } from "../../../utils/handle"

export default createMethodHandler({
  async get(req, resp) {
    const { MoLink } = await connect();
    resp.json(await MoLink.find().sort({ n: -1 }).limit(100));
  },
  async post(req, resp) {
    const doc = req.body;
    doc.n = 0; // Initial use-count is zero
    doc.createdAt = new Date(); // Created now
    const { MoLink } = await connect();
    return MoLink.create(doc).then(
      created => {
        resp.status(202).json(created);
      },
      error => {
        resp.status(400).json({ error: error.toString() });
      },
    );
  },
});
