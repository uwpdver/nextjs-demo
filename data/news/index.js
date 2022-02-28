import data from "./data.json";

export const getAllNews = () => data.map(({ id, name }) => ({ id, name }));

export const getNewsById = (id) => data.find((item) => item.id === id);