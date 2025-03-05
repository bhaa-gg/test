"use client";
import { Product } from "@/Types/a";
import { getAllProducts } from "@/utils/proudct";
import React, { useEffect, useState } from "react";
// import { CiSearch } from "react-icons/ci";

interface SearchInputFieldProps {
  action: (data: string) => void;
  className: string;
}

const SearchInputField = ({ action, className }: SearchInputFieldProps) => {
  const [Products, setProducts] = useState<Product[]>([]);
  const [ProductsFilter, setProductsFilter] = useState<Product[]>([]);
  const onChangeAction = (data: string) => {
    if (!data.trim()) {
      setProductsFilter([]);
      return;
    }
    const filterationData = Products.filter((p) =>
      p.productName.trim().toLowerCase().startsWith(data.trim().toLowerCase())
    );
    setProductsFilter(filterationData);
  };

  const runFirst = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };

  useEffect(() => {
    runFirst();
  }, []);

  return (
    <div className={` p-3 rounded-md    relative ${className}`}>
      <input
        onChange={(e) => onChangeAction(e.target.value)}
        type="text"
        className="w-full text-black my-2 p-3 outline-none outline-primaryColor rounded-sm"
        placeholder="Search By Product Name ..."
      />

      <ul
        className={`${
          !ProductsFilter.length ? "hidden" : ""
        } absolute w-full z-50 overflow-y-scroll max-h-64   bg-white `}
      >
        {ProductsFilter.length > 0 &&
          ProductsFilter.map((p: Product) => {
            return (
              <li
                onClick={() => action(p.productId)}
                key={p.productId}
                className="flex hover:scale-105 bg-white transition-all cursor-pointer border-b-2 p-3 items-center justify-between"
              >
                <p className="bg-secondaryColor  p-2  rounded-sm text-white font-bold ">
                  {p.productName}
                </p>
                <p className="bg-secondaryColor  p-2  rounded-sm text-white font-bold ">
                  {p.price} Le
                </p>
                <p className="bg-secondaryColor  p-2  rounded-sm text-white font-bold ">
                  {p.available || "outOfStock"}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchInputField;
