import Head from "next/head";

export default function Layout(props) {
  const { children, title = "" } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="p-10">{children}</main>

      <footer></footer>

      <style jsx>{``}</style>

      <style jsx global>{``}</style>
    </div>
  );
}
