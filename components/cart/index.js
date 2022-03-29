import { useContext } from "react";
import classNames from "classnames";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DismissIcon from "@fluentui/svg-icons/icons/dismiss_20_regular.svg";
import { CartContext } from "../../pages/_app";
import Empty from '../empty';

export default function Cart({ isOpen, onClose }) {
  const { cart } = useContext(CartContext)
  const router = useRouter();
  const handleOnCheckout = () => {
    router.push('/buy');
    onClose();
  }

  const listItemRender = (item) => (
    <li key={item.id} className="py-4">
      <Link href={`/product/${item.id}`}>
        <div className="cursor-point">
          <div className="flex speace-x-2">
            <div className="flex-shrink-0 relative w-32 h-32">
              <Image src={item.cover} layout="fill" objectFit="contain" />
            </div>
            <div className="flex-1">
              <div className="mb-2">{item.name}</div>
              <div className="mb-2 text-gray-500 text-sm">
                {`${item.size?.content}/${item.color?.content?.colorName}`}
              </div>
              <div>￥{item.price}</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )

  const total = cart.reduce((acc, cur) => acc + cur.price, 0)

  return (
    <div
      className={classNames("fixed flex flex-col w-96 h-screen right-0 top-0 z-10 px-6 py-6 transform translate-x-full transition-transform bg-white border-l", {
        'translate-x-0': isOpen
      })}
      role="dialog"
    >
      <div className="flex mb-4 items-center justify-between">
        <h3 >购物车</h3>
        <button onClick={onClose}>
          <Image src={DismissIcon} width={20} height={20} />
        </button>
      </div>
      <ul className="divide-y flex-1 overflow-y-auto scrollbar-none">
        {cart.length === 0 ? <Empty className=" mt-24"/> : cart.map(listItemRender)}
      </ul>
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">{`总计：￥${total}`}</div>
        <button className="flex-1 py-2 px-4 rounded border-gray-600 text-white bg-gray-800 hover:bg-gray-600" onClick={handleOnCheckout} disabled={cart.length === 0}>去结算</button>
      </div>
      <style jsx global>{`
        body {
          overflow: ${isOpen ? 'hidden' : 'none'};
          padding-right: ${isOpen ? `${document.body.clientWidth - window.innerWidth}px` : '0'};
        }
      `}</style>
    </div>
  )
} 