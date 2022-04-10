import Head from "next/head";
import Header from "../header";
import Footer from "../footer";

export interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ children, title = "" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
