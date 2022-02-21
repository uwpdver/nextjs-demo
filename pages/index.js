import Link from "next/link";
import Layout from "../components/layout";

export default function Home({ list = [] }) {
  return (
    <Layout title="主页">
      <nav>
        <ul>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
      <ul>
        {list.map((item) => (
          <li key={item.id} className="">
            <h1>
              <Link href={`/album/${item.id}`}>{item.name}</Link>
            </h1>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/albums`;
  const response = await fetch(url);
  const responseJson = await response.json();
  const { data } = responseJson;
  return {
    props: {
      list: data,
    },
  };
}
