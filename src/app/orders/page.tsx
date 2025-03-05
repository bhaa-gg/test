import { getAllOrders } from "@/utils/transactons";
import React from "react";
import OrderList from "./_components/OrderList";

const page = async () => {
  const allOrders = await getAllOrders();
  return <OrderList Orders={allOrders} />;
};

export default page;
