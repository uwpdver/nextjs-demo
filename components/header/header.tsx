import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import classNames from "classnames";

import CartIconRegular from "@fluentui/svg-icons/icons/cart_24_regular.svg";
import { CartContext } from "../../components/cart";
import { NAV_LIST } from "./constans";

export default function Header({}) {
  const router = useRouter();
  const { cart, open } = useContext(CartContext);

  const navListItemRender = ({ pathname, text }) => (
    <li
      key={pathname}
      className={classNames("px-8 py-1 flex items-center justify-center", {
        "bg-gray-800 text-white": pathname === router.asPath,
      })}
    >
      <Link href={pathname}>
        <a>{text}</a>
      </Link>
    </li>
  );

  return (
    <header className="flex items-center px-12 h-16">
      <Link href="/">
        <a className="flex items-center">
          <Image src="/images/logo.png" width={24} height={24} />
          <span className="ml-1 font-bold">MOOJI</span>
        </a>
      </Link>
      <nav className="flex-1">
        <ul className="flex items-center justify-center space-x-8">
          {NAV_LIST.map(navListItemRender)}
        </ul>
      </nav>
      <button className="relative cursor-pointer" onClick={open}>
        <Image src={CartIconRegular} width={28} height={28} />
        <span className="w-4 h-4 rounded-full bg-gray-700 text-white absolute top-0 right-0 text-xs text-center align-middle leading-4">
          {cart.reduce((acc, cur) => acc + cur.count, 0)}
        </span>
      </button>
    </header>
  );
}
