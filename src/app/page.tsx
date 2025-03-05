import ProductTable from "@/Components/ProductTable";
import TodayProperts from "@/Components/TodayProperts";
import React from "react";

const Home = () => {
  return (
    <div className="">
        <TodayProperts />
        <TodayProperts />
        <TodayProperts />
        <ProductTable />
        <ProductTable />
        <ProductTable />
    </div>
  );
};

export default Home;
