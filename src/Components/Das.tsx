"use client";
import { Product } from "@/Types/a";
import React from "react";

const Das = ({
  product,
  deleteFromList,
  changeCountMoney,
}: {
  product: Product;
  deleteFromList: (id: string) => void;
  calcTotalSalary: () => void;
  changeCountMoney: (id: string, val: number) => void;
}) => {
  return (
    <>
      <tr className="border-b ">
        <td className="py-3 px-6 text-sm">{product.productId}</td>
        <td className="py-3 px-6 text-sm">{product.productName}</td>
        <td className="py-3 px-6 text-sm">
          <input
            min={1}
            onChange={(e) => {
              changeCountMoney(product.productId, +e.target.value);
            }}
            defaultValue={1}
            className="p-3"
            type="number"
          />
        </td>
        <td className="py-3 px-6 text-sm">
          {product.price * product.quantity!} $
        </td>
        <td className="py-3 px-6 text-sm">
          <button
            onClick={() => deleteFromList(product.productId)}
            className="bg-red-500  text-white hover:scale-105 transition-all font-bold rounded-md px-3 py-1"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Das;
