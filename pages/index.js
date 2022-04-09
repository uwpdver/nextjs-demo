import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout title="主页">
      <section className="">
        <div className="pl-32 pr-20 pt-32 py-8 text-center mx-auto relative h-[640px]">
          <div className="relative z-10" >
            <h1
              className="text-6xl text-gray-800 leading-snug"
           
            >
              春季上新，春季上新
            </h1>
            <Link href="/store">
              <a className="rounded-full text-2xl bg-gray-800 px-6 py-2 text-white block w-max mt-8 mx-auto">
                立即查看
              </a>
            </Link>
          </div>
          <Image src="/images/home-bg.jpg" layout="fill" objectFit="cover" />
        </div>
      </section>
    </Layout>
  );
}