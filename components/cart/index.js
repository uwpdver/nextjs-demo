import { useContext } from "react";
import classNames from "classnames";
import Link from 'next/link';
import Image from 'next/image';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import DismissIcon from "@fluentui/svg-icons/icons/dismiss_20_regular.svg";
import { CartContext } from "../../pages/_app";
import Empty from '../empty';
import CheckIcon from "../check_icon";

export default function Cart({ isOpen, onClose }) {
  const { cart } = useContext(CartContext);
  const router = useRouter();

  const formRender = ({ values, setFieldValue, isSubmitting, isValid }) => {
    const listItemRender = ({ id, cover, name, size, color, price }) => {
      const idStr = id.toString();
      const checked = values.checked.includes(idStr);
      return (
        <li key={id} className="py-4">
          <div className="flex speace-x-2">

            <div className="flex-shrink-0 flex justify-center items-center">
              <label className="relative cursor-pointer">
                <Field type="checkbox" name="checked" value={idStr} className="absolute top-0 left-0 opacity-0" />
                <CheckIcon checked={checked} />
              </label>
            </div>

            <div className="flex-shrink-0 relative w-32 h-32">
              <Link href={`/product/${id}`}>
                <Image src={cover} layout="fill" objectFit="contain" />
              </Link>
            </div>

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

    const listRender = () => (
      <ul className="divide-y flex-1 overflow-y-auto scrollbar-none">
        {cart.length ? cart.map(listItemRender) : <Empty className=" mt-24" />}
      </ul>
    )

    const footerRender = () => {
      const onCheckAllChange = () => {
        setFieldValue('checked', values.checkAll ? [] : cart.map(({ id }) => id.toString()));
        setFieldValue('checkAll', !values.checkAll);
      }

      const total = cart
        .filter(({ id }) => values.checked.includes(id.toString()))
        .reduce((acc, cur) => acc + cur.price, 0);

      return (
        <footer>
          <div className="flex items-center space-x-4">
            <label className="flex-shrink-0 flex justify-center items-center cursor-pointer">
              <Field
                type="checkbox"
                name="checkAll"
                value="checkAll"
                onChange={onCheckAllChange}
                checked={values.checkAll}
                className="absolute top-0 left-0 opacity-0"
              />
              <CheckIcon checked={values.checkAll} />
            </label>
            <div className="text-lg font-bold">{`总计：￥${total}`}</div>
          </div>

          <button
            className="block w-full py-2 px-4 mt-4 rounded border-gray-600 text-white bg-gray-800 hover:bg-gray-600 disabled:opacity-30"
            disabled={!isValid || isSubmitting}
            type="submit"
          >
            去结算
          </button>
        </footer>
      )
    }

    return (
      <Form class="flex-1 flex flex-col">
        {listRender()}
        {footerRender()}
      </Form>
    )
  }

  const validate = (values) => {
    const errors = {};
    if (!values.checked.length) {
      errors.checked = '您还未选择任何商品';
    }
    return errors;
  }

  const onSubmit = async (values) => {
    alert(JSON.stringify(values, null, 2));
    router.push('/buy');
    onClose();
  }

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

      <Formik
        initialValues={{
          checkAll: false,
          checked: [],
        }}
        validate={validate}
        onSubmit={onSubmit}
      >
        {formRender}
      </Formik>

      <style jsx global>{`
        body {
          overflow: ${isOpen ? 'hidden' : 'none'};
          padding-right: ${isOpen ? `${document.body.clientWidth - window.innerWidth}px` : '0'};
        }
      `}</style>
    </div>
  )
} 