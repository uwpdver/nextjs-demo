import Link from "next/link";
import Image from "next/image";
import React, { useContext } from "react";

import CartIconRegular from "@fluentui/svg-icons/icons/cart_24_regular.svg";
import { CartContext } from "../../pages/_app";


export default function Header() {
  const { cart, open } = useContext(CartContext);
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
            <Link href="/store">
              <a>所有商品</a>
            </Link>
          </li>
          <li>
            <Link href="/store/woman">
              <a>女装</a>
            </Link>
          </li>
          <li>
            <Link href="/store/man">
              <a>男装</a>
            </Link>
          </li>
        </ul>
      </nav>
      <button className="relative cursor-pointer" onClick={open}>
        <Image src={CartIconRegular} width={28} height={28} />
        <span className="w-4 h-4 rounded-full bg-gray-700 text-white absolute top-0 right-0 text-xs text-center align-middle leading-4">{cart.length}</span>
      </button>
    </header>
  );
}
