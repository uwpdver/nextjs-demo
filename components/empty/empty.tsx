import React from "react";
import Image from "next/image";

import { DEFAULT_TEXT } from "./constans";

export interface Props {
  text?: string;
  className?: string;
}

export default function Empty({ text = DEFAULT_TEXT, className = "" }: Props) {
  return (
    <div className={`text-center mx-auto ${className}`}>
      <Image
        src="/images/yo-yo.png"
        width={150}
        height={150}
        objectFit="contain"
        quality={100}
        loading="lazy"
      />
      <p className="mt-4 text-gray-400">{text}</p>
    </div>
  );
}
