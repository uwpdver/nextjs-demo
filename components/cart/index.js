import { useContext } from "react";
import classNames from "classnames";
import Link from 'next/link';
import Image from 'next/image';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import DismissIcon from "@fluentui/svg-icons/icons/dismiss_20_regular.svg";
import checkmarkCircleIcon from "@fluentui/svg-icons/icons/checkmark_circle_20_regular.svg";
import checkmarkCircleFilledIcon from "@fluentui/svg-icons/icons/checkmark_circle_20_filled.svg";
import { CartContext } from "../../pages/_app";
import Empty from '../empty';

export default function Cart({ isOpen, onClose }) {
  const { cart } = useContext(CartContext);
  const router = useRouter();

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
        validate={(values) => {
          const errors = {};
          if (!values.checked.length) {
            errors.checked ='您还未选择任何商品';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
          router.push('/buy');
          onClose();
        }}
      >
        {({ values, setFieldValue, isSubmitting, isValid }) => {
          const total = cart
            .filter(({ id }) => values.checked.includes(id.toString()))
            .reduce((acc, cur) => acc + cur.price, 0);

          return (
            <Form class="flex-1 flex flex-col">
              <ul className="divide-y flex-1 overflow-y-auto scrollbar-none">
                {cart.length === 0
                  ? <Empty className=" mt-24" />
                  : cart.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex speace-x-2">
                        <div className="flex-shrink-0 flex justify-center items-center">
                          <label className="relative">
                            <Field type="checkbox" name="checked" value={item.id.toString()} className="absolute top-0 left-0 opacity-0" />
                            <Image src={values.checked.includes(item.id.toString()) ? checkmarkCircleFilledIcon : checkmarkCircleIcon} width={20} height={20} />
                          </label>
                        </div>

                        <div className="flex-shrink-0 relative w-32 h-32">
                          <Link href={`/product/${item.id}`}>
                            <Image src={item.cover} layout="fill" objectFit="contain" />
                          </Link>
                        </div>

                        <div className="flex-1">
                          <Link href={`/product/${item.id}`} className="mb-2">
                            {item.name}
                          </Link>
                          <div className="mb-2 text-gray-500 text-sm">
                            {`${item.size?.content}/${item.color?.content?.colorName}`}
                          </div>
                          <div>￥{item.price}</div>
                        </div>
                      </div>
                    </li >
                  ))
                }
              </ul>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 flex justify-center items-center">
                  <label >
                    <Field
                      type="checkbox"
                      name="checkAll"
                      value="checkAll"
                      onChange={
                        (e) => {
                          setFieldValue('checked', e.target.value === 'false' ? cart.map(({ id }) => id.toString()) : []);
                          setFieldValue('checkAll', e.target.value === 'false');
                        }
                      }
                      checked={values.checkAll}
                      className="absolute top-0 left-0 opacity-0"
                    />
                    <Image src={values.checkAll ? checkmarkCircleFilledIcon : checkmarkCircleIcon} width={20} height={20} />
                  </label>
                </div>
                <div className="text-lg font-bold">{`总计：￥${total}`}</div>
                <button
                  className="flex-1 py-2 px-4 rounded border-gray-600 text-white bg-gray-800 hover:bg-gray-600 disabled:opacity-30"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  去结算
                </button>
              </div>
            </Form>
          )
        }}
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