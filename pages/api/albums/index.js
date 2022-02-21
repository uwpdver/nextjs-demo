import data from './data.json';

export default function handler(req, res) {
  res.status(200).json({
    data: data.map(({ id, name }) => ({ id, name })),
  });
}
