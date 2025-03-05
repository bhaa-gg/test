"use client";
import { getProductById } from "@/utils/proudct";
import React, { useContext, useEffect, useRef, useState } from "react";
import RowProduct from "./RowProduct";
import { Product } from "@/Types/a";
import { toast } from "react-toastify";
import { getDashBoardData, makeOrder } from "@/utils/transactons";
import { conText } from "@/Contexts/Context";
import ScreenReader from "./ScreenReader";
import SearchInputField from "./SearchInputField";

const ProductTable = () => {
  const [DataList, setDataList] = useState<Product[]>([]);
  const [TotalSal, setTotalSal] = useState<number>(0);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [, setScanningId] = useState<string>("");
  const { setOrders, setSalesMoney } = useContext(conText);

  const deleteFromList = (id: string) => {
    const updatedList = DataList.filter((product) => product.productId !== id);
    setDataList(updatedList);
  };

  const changeCountMoney = (id: string, val: number) => {
    const updatedList = DataList.map((product) => {
      if (product.productId === id) {
        return {
          ...product,
          quantity: val,
          totalPrice: product.totalPrice! * val,
        };
      }
      return product;
    });
    setDataList(updatedList);
  };

  const calcTotalSalary = () => {
    const totalRevenue = DataList.reduce((sum, transaction) => {
      return sum + transaction.price * (transaction.quantity ?? 1);
    }, 0);

    setTotalSal(totalRevenue);
  };

  const clearList = async () => {
    if (!DataList.length) {
      toast.error("List Is Empty");
      return;
    }

    makeOrder(DataList, TotalSal);
    const { totalRevenue, orderCount } = await getDashBoardData();

    setOrders(orderCount);
    setSalesMoney(totalRevenue);

    setDataList([]);
  };

  const Search = (id?: string) => {
    const input = searchInput.current?.value.trim() || id?.trim();
    if (!input) {
      toast.error("Please enter a product ID");
      return;
    }
    getProductById(input)
      .then((data) => {
        if (!data) {
          toast.error("product Not Found ID");
          return;
        }
        data.quantity = 1;
        data.totalPrice = data.price * (data.quantity || 1);
        setDataList((prevList) => [...prevList, data]);
      })
      .finally(async () => {
        searchInput.current!.value = "";
      });
  };
  const scannCorect = (id: string) => {
    setScanningId(id);
    searchInput.current!.value = id;
  };

  useEffect(() => {
    calcTotalSalary();
  }, [DataList]);

  return (
    <div className="bg-slate-300 rounded-md p-3 w-full mt-10">
      <div className="ReadId w-full my-2 flex  items-center justify-between">
        <div className="input w-[45%] flex items-center justify-between    ">
          <input
            ref={searchInput}
            type="text"
            placeholder="Product ID"
            className="md:w-3/4 w-[90%] outline-none p-2 placeholder:text-white rounded-md bg-secondaryColor text-white"
          />
          <button
            onClick={() => Search()}
            className="bg-rating text-white hover:scale-105 transition-all font-bold rounded-md ms-2 px-3 py-2"
          >
            Search
          </button>
        </div>
        <SearchInputField className="w-[45%] " action={Search} />
      </div>
      <ScreenReader setScaningData={scannCorect} />
      <div className="w-full">
        <table className="min-w-full bg-white border  border-gray-200 shadow-md rounded-lg">
          <thead className="bg-primaryColor text-white">
            <tr>
              <th className="py-3  border-r-2  px-5 text-left text-sm font-medium uppercase tracking-wider">
                Prod ID
              </th>
              <th className="py-3  border-r-2  px-5 text-left text-sm font-medium uppercase tracking-wider">
                Prod Name
              </th>
              <th className="py-3  border-r-2  px-5 text-left text-sm font-medium uppercase tracking-wider">
                Prod Quantity
              </th>
              <th className="py-3  border-r-2  px-5 text-left text-sm font-medium uppercase tracking-wider">
                Total Price
              </th>
              <th className="py-3  border-r-2  px-5 text-left text-sm font-medium uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {DataList.map((p: Product, i: number) => {
              return (
                <RowProduct
                  calcTotalSalary={calcTotalSalary}
                  deleteFromList={deleteFromList}
                  changeCountMoney={changeCountMoney}
                  key={i}
                  product={p}
                />
              );
            })}
          </tbody>
        </table>
        <div className="end p-5 flex   flex-col justify-between md:flex-row ">
          <button
            onClick={clearList}
            className=" md:w-1/4 w-6/12 text-white text-center font-bold text-xl hover:scale-105 active:scale-95 p-3 transition-all bg-rating rounded-md "
          >
            Finish Operation
          </button>
          <h2 className="  mx-auto md:mx-0  my-2 md:w-1/4 w-6/12 text-white text-center font-bold text-2xl bg-primaryColor rounded-md p-5">
            TotalSal: {TotalSal} EGP
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
