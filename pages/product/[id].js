import { useState, useContext } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import Layout from "../../components/layout";
import Selector from "../../components/Selector";
import { getProducts, getProductById, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';
import { CartContext } from '../_app';

export default function Product({ id, name = '', description = '', price = 0, cover, sizes = [], colors = [] }) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [isLayoutAnimationComplete, setIsLayoutAnimationComplete] = useState(false);
  const [sizeRequireWarning, setSizeRequireWarning] = useState(false);
  const [colorRequireWarning, setColorRequireWarning] = useState(false);
  const { add } = useContext(CartContext);

  const withWarning = (fn) => {
    if (!selectedSize) {
      setSizeRequireWarning(true);
    } else if (!selectedColor) {
      setColorRequireWarning(true);
    } else {
      fn();
    }
  }

  const handleOnAddToCard = () => withWarning(() => {
    const color = colors.find(clr => selectedColor === clr.value);
    const size = sizes.find(sz => selectedSize === sz.value);
    add({ id, name, description, price, cover, color, size });
  })

  const onChangeSize = (e) => {
    if (e && e.value) {
      setSelectedSize(e.value)
      setSizeRequireWarning(false)
    }
  }

  const onChangeColor = (e) => {
    if (e && e.value) {
      setSelectedColor(e.value)
      setColorRequireWarning(false)
    }
  }

  const onColorSelectorItemRender = (e) => <div className='flex flex-col justify-center items-center '>
    <div className='w-4 h-4 border rounded-full' style={{ backgroundColor: e.content.colorHEX }} title={e.content.colorName} />
    <div className='mt-1 text-xs'>{e.content.colorName}</div>
  </div>

  const imgElem = <Image
    src={cover || DEFAULT_COVER_URL}
    width={500}
    height={500}
    objectFit="contain"
  />

  return (
    <Layout title={`产品/${name}`}>
      <section className="flex max-w-5xl mx-auto mt-10 mb-20">
        {
          isLayoutAnimationComplete
            ? <div className="flex-shrink-0 border">{imgElem}</div>
            : <motion.div
                layoutId={isLayoutAnimationComplete ? undefined : `cover-${id}`}
                initial={false}
                className="flex-shrink-0 border"
                onLayoutAnimationComplete={() => setIsLayoutAnimationComplete(true)}
              >
                {imgElem}
              </motion.div>
        }
        <div className="flex-1 flex flex-col ml-16">
          <motion.h2
            className="text-3xl mb-2 font-bold"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            {name}
          </motion.h2>
          <motion.p
            className="text-2xl mb-2"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
          >
            {`￥ ${price}`}
          </motion.p>
          <motion.p
            className="flex-1 text-gray-500"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
          >
            {description}
          </motion.p>
          <Selector
            title="选择尺码"
            value={selectedSize}
            onChange={onChangeSize}
            name="sizeSelector"
            id="product-selector-1"
            options={sizes}
            warning={sizeRequireWarning}
          />
          <Selector
            title="选择颜色"
            value={selectedColor}
            name="colorSelector"
            id="product-selector-2"
            onChange={onChangeColor}
            onItemRender={onColorSelectorItemRender}
            options={colors}
            warning={colorRequireWarning}
          />
          <div className="flex space-x-4">
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
      sizes = [],
      colors = [],
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
      sizes: sizes.map(({ id, name }) => ({
        key: id,
        value: id,
        content: name
      })),
      colors: colors.map(({ id, name, colorCodeHEX }) => ({
        key: id,
        value: id,
        content: {
          colorName: name,
          colorHEX: colorCodeHEX,
        }
      })),
      cover: `${STRAPI_BASE_URL}${url}`,
    },
  };
};
