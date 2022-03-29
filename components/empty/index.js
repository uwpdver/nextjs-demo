import React from 'react';
import Image from 'next/image';

const DEFAULT_TEXT = '这里什么都没有，去别处看看吧';

export default function Empty({ text = DEFAULT_TEXT, className='' }) {
    return (
        <div className={`text-center mx-auto ${className}`}>
            <Image src="/images/yo-yo.png" width={150} height={150} objectFit="contain" quality={100} loading="lazy"/>
            <p className='mt-4 text-gray-400'>{text}</p>
        </div>
    )
}