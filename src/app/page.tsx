import ProductTable from "@/Components/ProductTable";
import TodayProperts from "@/Components/TodayProperts";
import React from "react";

const Home = () => {
  return (
    <div className="">
    <div className="w-full">
        <TodayProperts />
        <ProductTable />
    </div>
    </div>
  );
};

export default Home;
