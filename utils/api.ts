export const STRAPI_BASE_URL = "http://helloo.world:1337";
// http://localhost:1337

export const getStrapiURL = (path: string) => {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || `${STRAPI_BASE_URL}/api`
  }${path}`;
};

export const fetchAPI = async (path: string) => {
  const reqUrl = getStrapiURL(path);
  const response = await fetch(reqUrl);
  const { data } = await response.json();
  return data;
};

export const getProducts = async (query: string | number) => {
  const products = await fetchAPI(`/products?${query}&populate=*`);
  return products;
};

export const getProductById = async (id: number) => {
  const product = await fetchAPI(`/products/${id}?populate=*`);
  return product;
};
