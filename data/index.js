import data from "./data.json";
export { default as product } from "./product";
export { default as news } from "./news";

export const getAllAlbums = () => data.map(({ id, name }) => ({ id, name }));

export const getAlbumsById = (id) => data.find((item) => item.id === id);
