"use client";
import { conText } from "@/Contexts/Context";
import React, { useContext } from "react";

const TodayProperts = () => {
  const { ToDay, Orders, SalesMoney } = useContext(conText);

  return (
    <div className="head flex   p-5 flex-col justify-between gap-3 ">
      <h3 className="bg-primaryColor md:w-1/4 w-[75%] text-center p-5 rounded-md text-white font-bold">
        Day: {ToDay}
      </h3>
      <h3 className="bg-primaryColor md:w-1/4 w-[75%] text-center p-5 rounded-md text-white font-bold">
        Total Orders: {Orders}
      </h3>
      <h3 className="bg-primaryColor md:w-1/4 w-[75%] text-center p-5 rounded-md text-white font-bold">
        Total Revenue: {SalesMoney} EGP
      </h3>
    </div>
  );
};

export default TodayProperts;
