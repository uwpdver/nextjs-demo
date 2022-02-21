import Layout from "../../components/layout";
import Link from "next/link";

export default function AlbumDetail({ detail = {} }) {
  return (
    <Layout title={`专辑/${detail.name}`}>
      <div>
        <Link href="/">
          <a>Back</a>
        </Link>
        <h2 className="mb-4 text-3xl font-semibold">{detail.name}</h2>
        <p className="text-sm">{`${detail.author} / ${detail.category} / ${detail.publishYear}`}</p>
        <div className="flex">
          <p className="mr-4 flex-1">{detail.description}</p>
          <img
            src={detail.coverUrl}
            width={150}
            height={150}
            alt=""
            className="bg-gray-200 flex-shrink-0"
          />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/albums`;
  const response = await fetch(url);
  const responseJson = await response.json();
  const { data } = responseJson;
  return {
    paths: data.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/albums/${encodeURIComponent(id)}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  const { data } = responseJson;
  return { props: { detail: data, bookId: id } };
};
