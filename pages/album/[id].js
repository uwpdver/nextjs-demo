import Link from "next/link";
import Layout from "../../components/layout";
import { getAllAlbums, getAlbumsById } from "../../data";

export default function AlbumDetail({ detail = {} }) {
  return (
    <Layout title={`专辑/${detail.name}`}>
      <div>
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

export const getStaticPaths = () => {
  return {
    paths: getAllAlbums().map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  return { props: { detail: getAlbumsById(id), bookId: id } };
};
