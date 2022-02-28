import Link from "next/link";
import Layout from "../../components/layout";
import { getAllProducts } from "../../data/product";

export default function Product({ data }) {
  return (
    <Layout title="product">
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/product/${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export function getStaticProps() {
  return {
    props: { data: getAllProducts() },
  };
}
