import Layout from "../../components/layout";
import { getAllNews, getNewsById } from "../../data/news";

export default function News({ detail = {} }) {
  return (
    <Layout title={`新闻/${detail.name}`}>
      <h2>{detail.name}</h2>
      <p>{detail.content}</p>
    </Layout>
  );
}

export const getStaticPaths = () => {
  return {
    paths: getAllNews().map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  return { props: { detail: getNewsById(id), bookId: id } };
};
