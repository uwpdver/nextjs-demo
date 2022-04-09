import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import qs from 'qs';

import Layout from "../../components/layout";
import Empty from "../../components/empty";
import { getProducts, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';

const GRID_ITEM_WIDTH = 300;

const ulvariants = {
  hidden: {

  },
  show: {
    transition: {
      staggerChildren: 0.12
    }
  },
}

const liVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

export default function Products({ data }) {
  const listItemRender = ({ id, attributes: { name, cover, price } }) => (
    <motion.li key={id} variants={liVariants}>
      <article className="cursor-pointer" >
        <div className="border">
          <Link href={`/product/${id}`} >
            <Image
              src={`${STRAPI_BASE_URL}${cover.data.attributes.url}` || DEFAULT_COVER_URL}
              objectFit="contain"
              loading="lazy"
              width={GRID_ITEM_WIDTH}
              height={GRID_ITEM_WIDTH}
            />
          </Link>
        </div>
        <Link href={`/product/${id}`} >
          <p className="truncate block mt-4" title={name}>{name}</p>
        </Link>
        <div className="mt-2 flex justify-between items-center">
          <span>{`￥${price}`}</span>
        </div>
      </article>
    </motion.li>
  )

  return (
    <Layout title="products">
      {data.length === 0
        ? <Empty className="my-24" />
        : <motion.ul
          className="grid gap-x-4 gap-y-16 mt-10 mb-20 mx-auto justify-center product-grid max-w-7xl grid-cols-4"
          initial="hidden"
          animate="show"
          variants={ulvariants}
        >
          {data.map(listItemRender)}
        </motion.ul>
      }
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
