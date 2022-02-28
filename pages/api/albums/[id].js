import { getAlbumsById } from "../../../data";

export default function handler(req, res) {
  const {
    query: { id },
  } = req;
  const item = getAlbumsById(id);
  res.status(200).json({ data: item });
}
