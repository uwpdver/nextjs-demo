import Image from "next/image";
import Layout from "../../components/layout";
import { getProducts, getProductById, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';

export default function Product({ id, name, description, price, cover }) {
  return (
    <Layout title={`产品/${name}`}>
      <section className="flex max-w-5xl mx-auto mt-10 mb-20">
        <Image
          src={cover || DEFAULT_COVER_URL}
          width={500}
          height={500}
          objectFit="contain"
          className="flex-shrink-0"
        />
        <div className="flex-1 flex flex-col space-y-8">
          <h2 className="text-4xl">{name}</h2>
          <p className="text-gray-500 flex-1">{description}</p>
          <div className="flex items-end">
            <p className="text-3xl">{`$ ${price}`}</p>
            <button className="ml-auto mr-0 w-60 border py-2 px-4 rounded border-gray-600 hover:text-white hover:bg-gray-600">立即购买</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await getProducts();
  return {
    paths: data.map(({ id }) => ({ params: { id: String(id) } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const {
    id,
    attributes: {
      name,
      description,
      price,
      cover: {
        data: {
          attributes: { url },
        },
      },
    },
  } = await getProductById(params.id);
  return {
    props: {
      id,
      name,
      description,
      price,
      cover: `${STRAPI_BASE_URL}${url}`,
    },
  };
};
