import React from 'react';
import { useFormik } from 'formik';
import Layout from "../../components/layout";
import Steps from '../../components/steps';

const steps = [
  {
    title: '填写收货地址',
  },
  {
    title: '提交订单',
  },
  {
    title: '选择付款方式',
  },
  {
    title: '完成购买',
  },
]

const Buy = ({ }) => {
  const formik = useFormik({
    initialValues: {
      phone: '',
      name: '',
      adress: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })
  return (
    <Layout title="购买">
      <div className='px-20 pb-10'>
        <Steps steps={steps} curIndex={2}  className='my-8'/>
        <div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-96 mx-auto" >
            <label htmlFor='name' className='mb-2'>收货人姓名</label>
            <input
              id="name"
              name="name"
              type="string"
              placeholder='名字'
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border border-gray-800 p-1 rounded"
            />

            <label htmlFor='phone' className='mb-2 mt-4'>手机号码</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder='请输入手机号码'
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="border border-gray-800 p-1 rounded"
            />

            <label htmlFor='address' className='mb-2 mt-4'>详细地址</label>
            <input
              id="adress"
              name="adress"
              type="string"
              placeholder='详细地址'
              onChange={formik.handleChange}
              value={formik.values.adress}
              className="border border-gray-800 p-1 rounded"
            />
            <button type="submit" className='mt-6 bg-gray-600 text-white h-10 rounded'>下一步</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Buy;