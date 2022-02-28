import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center px-12 h-16">
      <Link href="/">
        <a className="flex items-center">
          <Image src="/images/logo.png" width={24} height={24} />
          <span className="ml-1 font-bold">Moogas</span>
        </a>
      </Link>
      <nav className="flex-1">
        <ul className="flex items-center justify-center space-x-8">
          <li>
            <Link href="/">
              <a>首页</a>
            </Link>
          </li>
          <li>
            <Link href="/product">
              <a>选购</a>
            </Link>
          </li>
          <li>
            <Link href="/news">
              <a>新闻</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>社区</a>
            </Link>
          </li>
        </ul>
      </nav>
      <input
        type="search"
        className="mr-4 px-2 w-40 rounded-full bg-gray-100"
      />
    </header>
  );
}
