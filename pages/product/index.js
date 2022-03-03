import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout";
import { getProducts, STRAPI_BASE_URL } from "../../utils/api";
import { DEFAULT_COVER_URL } from '../../constants';

export default function Product({ data }) {
  return (
    <Layout title="product">
      <ul className="grid grid-cols-4 gap-4 mt-10 mx-20 mb-20">
        {data.map(({ id, attributes: { name, cover } }) => (
          <li key={id}>
            <Link href={`/product/${id}`} >
              <div className="hover:bg-gray-100 text-center p-4 cursor-pointer">
                <Image
                  src={`${STRAPI_BASE_URL}${cover.data.attributes.url}` || DEFAULT_COVER_URL}
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <p className="text-lg">{name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getProducts()
  return {
    props: { data: data },
  };
}
