import Layout from "../../components/layout";
import { getAllProducts, getProductById } from "../../data/product";

export default function Product({ detail = {} }) {
  return (
    <Layout title={`产品/${detail.name}`}>
      <h2>{detail.name}</h2>
      <p>{detail.content}</p>
    </Layout>
  );
}

export const getStaticPaths = () => {
  return {
    paths: getAllProducts().map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  return { props: { detail: getProductById(id), bookId: id } };
};
