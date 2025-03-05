import Das from "@/Components/das";
import ProductTable from "@/Components/ProductTable";
import TodayProperts from "@/Components/TodayProperts";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <div className="container mx-auto w-full xl:w-[90%] ">
        <TodayProperts />
        <TodayProperts />
        <TodayProperts />
        <ProductTable />
        <ProductTable />
        <ProductTable />
        {/* <Das /> */}
      </div>
    </div>
  );
};

export default Home;
