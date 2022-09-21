import { connect } from "../../../utils/connection"
import { createMethodHandler } from "../../../utils/handle"

export default createMethodHandler({
  async get(req, resp) {
    const { MoLink } = await connect();
    resp.json(await MoLink.find().sort({ n: -1 }).limit(100));
  },
  async post(req, resp) {
    const { MoLink } = await connect();
    return MoLink.create(req.body).then(
      created => {
        resp.status(202).json(created);
      },
      error => {
        resp.status(400).json({ error: error.toString() });
      },
    );
  },
});
