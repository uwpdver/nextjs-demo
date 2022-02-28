import Head from "next/head";
import Header from "../header";
import Footer from "../footer";

export default function Layout(props) {
  const { children, title = "" } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>

      <Footer />

      <style jsx>{``}</style>

      <style jsx global>{``}</style>
    </div>
  );
}
