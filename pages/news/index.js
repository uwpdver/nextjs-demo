import Link from "next/link";
import Layout from "../../components/layout";
import { getAllNews } from "../../data/news";

export default function News({ data }) {
  return (
    <Layout title="about">
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/news/${id}`}>
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
    props: { data: getAllNews() },
  };
}
