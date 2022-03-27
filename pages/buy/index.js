import React from 'react';
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
  return (
    <Layout title="购买">
      <div className='px-20'>
        <Steps steps={steps} curIndex={2} />
      </div>
    </Layout>
  );
}

export default Buy;