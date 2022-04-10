import React from "react";
import Image from "next/image";
import checkmarkCircleIcon from "@fluentui/svg-icons/icons/checkmark_circle_20_regular.svg";
import checkmarkCircleFilledIcon from "@fluentui/svg-icons/icons/checkmark_circle_20_filled.svg";

export interface Props {
  className?: string;
  checked?: boolean;
  size?: number;
}

export default function CheckIcon({
  checked = false,
  size = 20,
  className = "",
}: Props) {
  return (
    <Image
      className={className}
      src={checked ? checkmarkCircleFilledIcon : checkmarkCircleIcon}
      width={size}
      height={size}
    />
  );
}
