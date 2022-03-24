import Link from "next/link";
import Image from "next/image";
import qs from 'qs';

import Layout from "../../components/layout";
import { getProducts, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';
import { useContext } from 'react';
import { CartContext } from './../_app';

const GRID_ITEM_WIDTH = 300;

export default function Product({ data }) {
  const { add } = useContext(CartContext);
  const handleOnAddToCard = (item) => {
    add(item)
  }

  return (
    <Layout title="product">
      <ul className="grid gap-x-4 gap-y-16 mt-10 mb-20 mx-auto justify-center product-grid max-w-7xl">
        {data.map(({ id, attributes: { name, cover, price, description } }) => (
          <li key={id}>
            <article className="cursor-pointer">
              <Link href={`/product/${id}`} >
                <div className="border">
                  <Image
                    src={`${STRAPI_BASE_URL}${cover.data.attributes.url}` || DEFAULT_COVER_URL}
                    objectFit="contain"
                    loading="lazy"
                    width={GRID_ITEM_WIDTH}
                    height={GRID_ITEM_WIDTH}
                  />
                </div>
              </Link>
              <Link href={`/product/${id}`} >
                <p className="truncate block mt-4" title={name}>{name}</p>
              </Link>
              <div className="mt-2 flex justify-between items-center">
                <span>{`￥${price}`}</span>
                <button className="py-1 px-2 rounded text-white bg-gray-800 text-xs" onClick={() => handleOnAddToCard({ id, name, cover: `${STRAPI_BASE_URL}${cover.data.attributes.url}`, price, description })}>添加到购物车</button>
              </div>
            </article>
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
