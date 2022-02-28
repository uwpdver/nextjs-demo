import data from "./data.json";

export const getAllProducts = () => data.map(({ id, name }) => ({ id, name }));

export const getProductById = (id) => data.find((item) => item.id === id);