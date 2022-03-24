import { useState, useContext } from 'react';
import Image from "next/image";
import Layout from "../../components/layout";
import Selector from "../../components/Selector";
import { getProducts, getProductById, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';
import { CartContext } from '../_app';

export default function Product({ id, name, description, price, cover }) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const { add } = useContext(CartContext);

  const handleOnAddToCard = () => {
    add({ id, name, description, price, cover })
  }

  const onChangeSize = (e) => {
    if (e && e.value) {
      setSelectedSize(e.value)
    }
  }

  const onChangeColor = (e) => {
    if (e && e.value) {
      setSelectedColor(e.value)
    }
  }

  const onColorSelectorItemRender = (e) => <div className='flex flex-col justify-center items-center '>
    <div className='w-4 h-4 border rounded-full' style={{ backgroundColor: e.content.colorHEX }} title={e.content.colorName} />
  </div>

  return (
    <Layout title={`产品/${name}`}>
      <section className="flex max-w-5xl mx-auto mt-10 mb-20">
        <div className="flex-shrink-0 border">
          <Image
            src={cover || DEFAULT_COVER_URL}
            width={500}
            height={500}
            objectFit="contain"
          />
        </div>
        <div className="flex-1 flex flex-col ml-16">
          <h2 className="text-3xl mb-2 font-bold">{name}</h2>
          <p className="text-2xl mb-2">{`￥ ${price}`}</p>
          <p className="flex-1 text-gray-500">{description}</p>
          <Selector
            title="选择尺码"
            value={selectedSize}
            onChange={onChangeSize}
            name="sizeSelector"
            id="product-selector-1"
            options={[
              {
                key: 'S',
                value: 'S',
                content: 'S',
              },
              {
                key: 'M',
                value: 'M',
                content: 'M',
              },
              {
                key: 'L',
                value: 'L',
                content: 'L',
              },
            ]}
          />
          <Selector
            title="选择颜色"
            value={selectedColor}
            name="colorSelector"
            id="product-selector-2"
            onChange={onChangeColor}
            onItemRender={onColorSelectorItemRender}
            options={[
              {
                key: 'R',
                value: 'R',
                content: {
                  colorHEX: '#f00',
                  colorName: '红'
                },
              },
              {
                key: 'G',
                value: 'G',
                content: {
                  colorHEX: '#0f0',
                  colorName: '绿'
                },
              },
              {
                key: 'B',
                value: 'B',
                content: {
                  colorHEX: '#00f',
                  colorName: '蓝'
                },
              },

            ]} />
          <div className="flex space-x-4">
            <button className="flex-1 w-60 border py-2 px-4 rounded border-gray-400 hover:border-gray-800 hover:text-gray-600">立即购买</button>
            <button className="flex-1 w-60 border py-2 px-4 rounded border-gray-600 text-white bg-gray-800 hover:bg-gray-600" onClick={handleOnAddToCard}>加入购物车</button>
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
