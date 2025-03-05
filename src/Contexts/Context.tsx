"use client";
import React, { createContext, useState } from "react";

interface ContextValue {
  Orders: number;
  setOrders: React.Dispatch<React.SetStateAction<number>>;
  SalesMoney: number;
  setSalesMoney: React.Dispatch<React.SetStateAction<number>>;
  ToDay: string;
  setToDay: React.Dispatch<React.SetStateAction<string>>;
}

export const conText = createContext<ContextValue>({
  Orders: 0,
  setSalesMoney: () => {},
  SalesMoney: 0,
  setOrders: () => {},
  ToDay: "",
  setToDay: () => {},
});

const Context = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [ToDay, setToDay] = useState("");
  const [Orders, setOrders] = useState(0);
  const [SalesMoney, setSalesMoney] = useState(0);
  return (
    <conText.Provider
      value={{ ToDay, setToDay, Orders, setOrders, SalesMoney, setSalesMoney }}
    >
      {children}
    </conText.Provider>
  );
};

export default Context;
