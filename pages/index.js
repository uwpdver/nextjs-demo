import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout title="主页">
      <section className="">
        <div className="flex pl-32 pr-20 py-8 banner">
          <style jsx>{`
            .banner {
              background-image: linear-gradient(25deg, #38143e, #612851, #8c3e65, #b9557a);
            }
          `}</style>
          <div className="flex-1 pt-64 pb-32 ">
            <h1 className=" text-6xl text-white">春季上新</h1>
            <Link href="/">
              <a className="rounded-full text-2xl bg-gray-400 px-6 py-2 text-white block w-max mt-8">
                立即查看
              </a>
            </Link>
          </div>
          <Image src="/images/banner.png" width={870} height={675} />
        </div>
      </section>
    </Layout>
  );
}