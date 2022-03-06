import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100 pt-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-8 mb-8">
          <div className="basis-2/5 flex-1">
            <h4 className="space-x-2 mb-4 text-sm font-bold text-gray-600">
              Moogas
            </h4>
            <p className="text-xs leading-5 text-gray-500">
              Moogas
              是一个区块链及人工智能技术的狗，在元宇宙中领养一只宠物狗，它能够给予你心灵上的慰藉，让您在平凡的生活中增添无限的快乐，并且它会永远会陪伴你，我们致力于让元宇宙中的每一人都拥有一只
              Moogas。
            </p>
          </div>
          <div className="basis-1/5">
            <h4 className="space-x-2 mb-4 text-sm font-bold text-gray-600">
              选购及了解
            </h4>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>
                <Link href="">
                  <a>商店</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>Moogas 1</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>Moogas 2</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>Moogas X</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="basis-1/5">
            <h4 className="space-x-2 mb-4 text-sm font-bold text-gray-600">
              服务
            </h4>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>
                <Link href="">
                  <a>官方零售店</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>维修点</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>以旧换新</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>翻新和优惠商店</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="basis-1/5">
            <h4 className="space-x-2 mb-4 font-bold text-gray-600">资源</h4>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>
                <Link href="">
                  <a>使用说明</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>开发文档</a>
                </Link>
              </li>
              <li>
                <Link href="">
                  <a>设计工具</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <div>© Moogas 2022</div>
          <ul className="flex-1 flex items-center justify-end space-x-4">
            <li>
              <Link href="/">
                <a>联系我们</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>隐私政策</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>使用条款</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
