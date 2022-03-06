import Link from "next/link";
import Image from "next/image";
import qs from 'qs';

import Layout from "../../components/layout";
import { getProducts, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';

const GRID_ITEM_WIDTH = 300;

export default function Product({ data }) {
  return (
    <Layout title="product">
      <ul className="grid gap-x-4 gap-y-16 mt-10 mb-20 mx-auto justify-center product-grid max-w-7xl">
        {data.map(({ id, attributes: { name, cover, price } }) => (
          <li key={id}>
            <Link href={`/product/${id}`} >
              <article className="cursor-pointer">
                <div className="border">
                  <Image
                    src={`${STRAPI_BASE_URL}${cover.data.attributes.url}` || DEFAULT_COVER_URL}
                    objectFit="contain"
                    loading="lazy"
                    width={GRID_ITEM_WIDTH}
                    height={GRID_ITEM_WIDTH}
                  />
                </div>
                <p className="truncate block mt-4" title={name}>{name}</p>
                <p className="mt-2">{`￥${price}`}</p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx >
        {`
        .product-grid {
          grid-template-columns: repeat(auto-fill, ${GRID_ITEM_WIDTH}px);
        }
        `}
      </style>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { category: [] } },
      { params: { category: ['man'] } },
      { params: { category: ['woman'] } },
    ],
    fallback: false,
  };
};


export async function getStaticProps({ params }) {
  const { category } = params;
  const filterQuery = category ? qs.stringify({
    filters: {
      category: {
        $eq: category[0].toLocaleUpperCase(),
      },
    },
  }) : '';
  const data = await getProducts(filterQuery)
  return {
    props: { data: data },
  };
}
