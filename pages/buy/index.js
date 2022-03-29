import React from 'react';
import { useFormik } from 'formik';
import chevronDownIcon from '@fluentui/svg-icons/icons/chevron_down_20_filled.svg';

import Layout from "../../components/layout";
import Steps from '../../components/steps';
import pcd from './pcd.json';

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
      province: '北京市',
      city: '市辖区',
      distict: '朝阳区',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })


  const provinceOptions = Object.keys(pcd);
  const cityOptions = Object.keys(pcd[formik.values.province]);
  const distictOptions = pcd[formik.values.province][formik.values.city] || [];

  return (
    <Layout title="购买">
      <div className='px-20 pb-10'>
        <Steps steps={steps} curIndex={2} className='my-8' />
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

            <label htmlFor='province-city-distict' className='mb-2 mt-4'>地区</label>
            <div className='flex '>
              <select
                className='flex-1 border border-gray-800 py-1 pl-2 pr-8 rounded-l appearance-none'
                name='province'
                value={formik.values.province}
                onChange={formik.handleChange}
              >
                <option value>省</option>
                {provinceOptions.map((key) => <option value={key} key={key}>{key}</option>)}
              </select>
              <select
                className='flex-1 border-y border-gray-800 py-1 pl-2 pr-8 appearance-none'
                name='city'
                value={formik.values.city}
                onChange={formik.handleChange}
              >
                <option value>市</option>
                {cityOptions.map((key) => <option value={key} key={key}>{key}</option>)}
              </select>
              <select
                className='flex-1 border border-gray-800 py-1 pl-2 pr-8 rounded-r appearance-none'
                value={formik.values.distict}
                onChange={formik.handleChange}
                name="distict"
              >
                <option value>区</option>
                {distictOptions.map((key) => <option value={key} key={key}>{key}</option>)}
              </select>
              <style jsx>
                {`
                  select {
                    background-image: url(${chevronDownIcon.src});
                    background-size: 20px;
                    background-repeat: no-repeat;
                    background-position: center right 8px;                    
                  }
                `}
              </style>
            </div>

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