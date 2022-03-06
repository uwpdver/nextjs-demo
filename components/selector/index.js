import React from 'react';

export default function Selector({ title, options = [], value, onChange, onItemRender, name, id }) {
  return <div className="mb-8">
    <h2 className="mb-4 font-semibold">{title}</h2>
    <div className="grid grid-cols-4 gap-4">
      {options.map((item) =>
        <div key={item.key} className="relative">
          <input
            id={id}
            type="radio"
            className="absolute opacity-0 t-0 l-0 w-full h-full cursor-pointer "
            name={name}
            checked={value === item.value}
            onChange={() => onChange(item)}
          />
          <label
            className={`flex justify-center items-center w-full border rounded h-12 ${value === item.value ? 'border-gray-800' : ''}`}
            htmlFor={id}
          >
            {
              typeof onItemRender === 'function'
                ? onItemRender(item)
                : item.content
            }</label>
        </div>
      )}
    </div>
  </div>
}