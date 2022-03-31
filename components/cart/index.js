import { useContext } from "react";
import classNames from "classnames";
import { useFormik } from 'formik';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DismissIcon from "@fluentui/svg-icons/icons/dismiss_20_regular.svg";
import Empty from '../empty';
import CheckIcon from "../check_icon";
import { CartContext } from "../../pages/_app";
import { SESION_STORAGE_KEYS } from '../../constants';

export default function Cart({ isOpen, onClose }) {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      checked: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values.checked.length) {
        errors.checked = '您还未选择任何商品';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const data = JSON.stringify(values.checked);
        sessionStorage.setItem(SESION_STORAGE_KEYS.SELECTED_CART_ITEMS, data)
        router.push('/buy');
        onClose();
      } catch (error) {
        // hanlde error here
      }
    },
  });

  const { values } = formik;

  const listItemRender = ({ id, cover, name, size, color, price }) => {
    const idStr = id.toString();
    const checked = values.checked.includes(idStr);
    return (
      <li key={id} className="py-4">
        <div className="flex speace-x-2">
          <label className="flex-shrink-0 relative flex justify-center items-center cursor-pointer">
            <input
              type="checkbox"
              name="checked"
              value={idStr}
              className="absolute top-0 left-0 opacity-0"
              checked={checked}
              onChange={formik.handleChange}
            />
            <CheckIcon checked={checked} />
          </label>

          <Link href={`/product/${id}`}>
            <div className="flex-shrink-0 relative w-32 h-32 cursor-pointer">
              <Image src={cover} layout="fill" objectFit="contain" />
            </div>
          </Link>

          <div className="flex-1">
            <Link href={`/product/${id}`} className="mb-2">
              {name}
            </Link>
            <div className="mb-2 text-gray-500 text-sm">
              {`${size?.content}/${color?.content?.colorName}`}
            </div>
            <div>￥{price}</div>
          </div>
        </div>
      </li >
    )
  }

  const isCheckedAll = values.checked.length === cart.length

  const onCheckAllChange = () => {
    formik.setFieldValue('checked', isCheckedAll ? [] : cart.map(({ id }) => id.toString()));
  }

  const total = cart
    .filter(({ id }) => values.checked.includes(id.toString()))
    .reduce((acc, cur) => acc + cur.price, 0);

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
      <form className="flex-1 flex flex-col" onSubmit={formik.handleSubmit}>
        <ul className="divide-y flex-1 overflow-y-auto scrollbar-none">
          {cart.length ? cart.map(listItemRender) : <Empty className=" mt-24" />}
        </ul>

        <div className="flex items-center space-x-4">
          <label className="flex-shrink-0 flex justify-center items-center cursor-pointer">
            <input
              type="checkbox"
              name="checkAll"
              value="checkAll"
              onChange={onCheckAllChange}
              checked={isCheckedAll}
              className="absolute top-0 left-0 opacity-0"
            />
            <CheckIcon checked={isCheckedAll} />
          </label>
          <div className="text-lg font-bold">{`总计：￥${total}`}</div>
        </div>

        <button
          className="block w-full py-2 px-4 mt-4 rounded border-gray-600 text-white bg-gray-800 hover:bg-gray-600 disabled:opacity-30"
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
        >
          去结算
        </button>
      </form>
      <style jsx global>
        {
          `
            body {
              overflow: ${isOpen ? 'hidden' : 'none'};
              padding-right: ${isOpen ? `${document.body.clientWidth - window.innerWidth}px` : '0'};
            }
          `
        }
      </style>
    </div>
  )
} 