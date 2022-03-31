import React from 'react';
import classNames from 'classnames';

const Steps = ({ curIndex = 0, steps = [], className = '' }) => {
  const stepRender = ({ title }, index) => {
    return (
      <div className={classNames('overflow-x-hidden step-item flex-1 pl-4 first:pl-0 last:flex-none group', className)} key={index}>
        <div>
          <div className={classNames('step-item-title relative inline-block pr-4 group-last:pr-0 after:bg-gray-800 after:absolute after:left-full after:top-1/2', {
            'after:opacity-10': index >= curIndex
          })} >
            {title}
          </div>
          <style jsx>
            {`
              .step-item-title::after {
                content: "";
                width: 9999px;
                height: 1px;
              }
            `}
          </style>
        </div>
      </div>
    )
  }

  return (
    <div className='flex steps-container'>
      {steps.map(stepRender)}
    </div>
  )
}

export default Steps;