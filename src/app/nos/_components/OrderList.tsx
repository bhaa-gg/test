"use client";
import { DaySales, Transaction } from "@/Types/a";
import React, { useState } from "react";

const OrderList = ({ Orders }: { Orders: DaySales[] }) => {
  const [AllOrders] = useState<DaySales[]>(Orders);
  const [OrdersDay, setOrdersDay] = useState<DaySales>(AllOrders[0]);
  const [OperationAlert, setOperationAlert] = useState<Transaction>({
    id: 0,
    totalPrice: 0,
    products: [],
  });

  const onDayChange = (val: string) => {
    const MyOrders = AllOrders.find((o) => o.day == val);
    if (MyOrders) setOrdersDay(MyOrders);
  };
  const onClickOfAnyDay = (data: Transaction) => {
    setOperationAlert(data);
  };

  return (
    <div className={`relative h-[75vh] transition-all `}>
      <div
        className={`alert transition-all max-h-96 overflow-y-scroll ${
          OperationAlert.totalPrice ? "opacity-100" : "opacity-0 hidden"
        } top-1/2 left-1/2 
         
        -translate-x-1/2 z-30  -translate-y-1/2 absolute w-3/4 bg-primaryColor border-black border-2 rounded-md p-5`}
      >
        <div className="head ms-auto  w-fit">
          <button
            className=" text-2xl bg-slate-400 text-center w-9 flex item-center justify-center h-9  rounded-full "
            onClick={() =>
              setOperationAlert({ id: 0, totalPrice: 0, products: [] })
            }
          >
            X
          </button>
        </div>
        <div className="body">
          {OperationAlert.products.map((p, i) => {
            return (
              <div
                key={i}
                className="flex gap-3 rounded-md m-5 bg-white p-3 items-center justify-between "
              >
                <p className="text-center font-bold px-3 border-b  py-2 bg-black text-white">
                  {p.productName}
                </p>
                <p className="text-center font-bold px-3 border-b  py-2 bg-black text-white">
                  {p.price} LE
                </p>
                <p className="text-center font-bold px-3 border-b  py-2 bg-black text-white">
                  {p.quantity}
                </p>
                <p className="text-center font-bold px-3 border-b  py-2 bg-black text-white">
                  {(p.quantity || 0) * p.price}
                </p>
              </div>
            );
          })}
        </div>
        <div className="end w-full  flex items-center justify-around ">
          <p className="text-xl font-bold ">Order Id: {OperationAlert.id}</p>
          <p className="text-xl font-bold ">
            Total Price: {OperationAlert.totalPrice} LE
          </p>
        </div>
      </div>
      <div className="w-1/4 ms-auto ">
        <select
          onChange={(e) => onDayChange(e.target.value)}
          className="ms-auto outline text-xl fond-bold m-3 p-3"
        >
          {AllOrders.map((order) => {
            return (
              <option key={order.day} value={order.day}>
                {order.day}
              </option>
            );
          })}
          <option value=""></option>
        </select>
      </div>
      <div className=" w-3/4 mx-auto">
        <h1
          className={`mt-5 text-center ${
            OrdersDay.DaySales.length ? "hidden" : ""
          } text-primaryColor font-bold text-2xl`}
        >
          No Order In This Day 🤨 🤨
        </h1>
        {OrdersDay.DaySales.map((day) => {
          return (
            <div
              onClick={() => onClickOfAnyDay(day)}
              key={day.id}
              className="my-2 text-white  text-xl rounded-sm font-bold bg-secondaryColor  transition-all cursor-pointer  p-2 border"
            >
              {day.time || day.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
