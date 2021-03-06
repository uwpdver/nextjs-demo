import React from "react";
import classNames from "classnames";

import { Option } from "../../types";

interface OptionContentRender {
  (option: Option<any>): React.ReactNode;
}

export interface Props {
  id: string;
  name: string;
  value: string;
  title: string;
  options: Option<any>[];
  onChange(option: Option<any>): void;
  optionContentRender?: OptionContentRender;
  warning?: boolean;
}

export default function Selector({
  title,
  options = [],
  value,
  onChange,
  optionContentRender,
  name,
  id,
  warning,
}: Props) {
  return (
    <div className="mb-8">
      <h2
        className={classNames("mb-4 font-semibold relative selector-title", {
          "ring ring-red-600 warning": warning,
        })}
      >
        {title}
      </h2>
      <style jsx>
        {`
          .selector-title.warning::before {
            content: "*";
            position: absolute;
            left: -1rem;
            top: 50%;
            transform: translateY(-50%);
            color: red;
          }
        `}
      </style>
      <div className="grid grid-cols-4 gap-4">
        {options.map((item) => (
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
              className={`flex justify-center items-center w-full border rounded h-12 ${
                value === item.value ? "ring-green-300 ring-2" : ""
              }`}
              htmlFor={id}
            >
              {typeof optionContentRender === "function"
                ? optionContentRender(item)
                : item.content}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
