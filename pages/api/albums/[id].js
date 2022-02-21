import data from './data.json';

export default function handler(req, res) {
  const {
    query: { id },
  } = req;
  const item = data.find((item) => id === item.id);
  res.status(200).json({ data: item });
}
