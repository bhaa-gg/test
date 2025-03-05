"use client";
import { conText } from "@/Contexts/Context";
import { getDashBoardData } from "@/utils/transactons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import SearchInputField from "./SearchInputField";
import logo from "@/assets/MYL.png";
import Image from "next/image";

const NavBar = () => {
  const [ActiveLink, setActiveLink] = useState("/");
  const { setOrders, setSalesMoney, setToDay } = useContext(conText);

  const router = usePathname();
  const showRputer = () => {
    setActiveLink(router);
  };

  const searchAction = () => {};
  const getFirstData = async () => {
    const { day, totalRevenue, orderCount } = await getDashBoardData();
    setOrders(orderCount);
    setSalesMoney(totalRevenue);
    setToDay(day);
  };

  useEffect(() => {
    showRputer();
  }, [router]);

  useEffect(() => {
    getFirstData();
  }, []);

  return (
    <header className=" bg-gradient-to-r from-primaryColor to-black/75 text-white">
      <nav className="flex  flex-wrap items-center mx-auto w-full md:w-[90%] justify-between ">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={100} height={100} />
        </Link>

        <ul className="flex w-[80%] xl:w-fit xl:order-3 items-center mx-auto p-2 gap-7 justify-between  ">
          <li>
            <Link
              className={`nav-link ${ActiveLink == "/" ? "active" : ""}`}
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${ActiveLink == "/product" ? "active" : ""}`}
              href={"/product"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${ActiveLink == "/orders" ? "active" : ""}`}
              href={"/orders"}
            >
              Orders
            </Link>
          </li>
        </ul>
        <SearchInputField
          className="xl:w-[30%] w-[75%] translate-x-0 xl:translate-x-1/2 "
          action={searchAction}
        />
      </nav>
    </header>
  );
};

export default NavBar;
