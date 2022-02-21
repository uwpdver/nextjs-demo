import Link from "next/link";
import Layout from "../../components/layout";

export default function About() {
  return (
    <Layout title="about">
      <Link href="/">
        <a>Back</a>
      </Link>
      <h1>This is About Page</h1>
    </Layout>
  );
}
