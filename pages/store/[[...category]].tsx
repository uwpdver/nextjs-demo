import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import qs from "qs";

import Layout from "../../components/layout";
import Empty from "../../components/empty";
import { getProducts, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from "../../constants";

const GRID_ITEM_WIDTH = 300;

export default function Products({ data }) {
  const listItemRender = ({ id, attributes: { name, cover, price } }) => (
    <li key={id}>
      <article className="cursor-pointer">
        <div className="border">
          <Link href={`/product/${id}`}>
            <Image
              src={
                `${STRAPI_BASE_URL}${cover.data.attributes.url}` ||
                DEFAULT_COVER_URL
              }
              objectFit="contain"
              loading="lazy"
              width={GRID_ITEM_WIDTH}
              height={GRID_ITEM_WIDTH}
            />
          </Link>
        </div>
        <Link href={`/product/${id}`}>
          <p className="truncate block mt-4" title={name}>
            {name}
          </p>
        </Link>
        <div className="mt-2 flex justify-between items-center">
          <span>{`￥${price}`}</span>
        </div>
      </article>
    </li>
  );

  return (
    <Layout title="products">
      {data.length === 0 ? (
        <Empty className="my-24" />
      ) : (
        <ul className="grid gap-x-4 gap-y-16 mt-10 mb-20 mx-auto justify-center product-grid max-w-7xl grid-cols-4">
          {data.map(listItemRender)}
        </ul>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { category: [] } },
      { params: { category: ["man"] } },
      { params: { category: ["woman"] } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category } = params;
  const filterQuery = category
    ? qs.stringify({
        filters: {
          category: {
            $eq: category[0].toLocaleUpperCase(),
          },
        },
      })
    : "";
  const data = await getProducts(filterQuery);
  return {
    props: { data: data },
  };
};
