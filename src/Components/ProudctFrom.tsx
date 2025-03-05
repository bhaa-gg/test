"use client";
import { Product, ProductAvilability } from "@/Types/a";
import {
  AddNewProduct,
  DeleteProduct,
  getProductById,
  UpdateProduct,
} from "@/utils/proudct";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import ScreenReader from "./ScreenReader";
import { FcFullTrash } from "react-icons/fc";

const ProudctFrom = () => {
  const IdInput = useRef<HTMLInputElement | null>(null);
  const [, setScanningId] = useState<string>("");

  const PriceInput = useRef<HTMLInputElement | null>(null);
  const NameInput = useRef<HTMLInputElement | null>(null);
  const AvailableInput = useRef<HTMLSelectElement | null>(null);
  const [IsUpdated, setIsUpdated] = useState<boolean>(false);

  const scannCorect = (id: string) => {
    setScanningId(id);
    IdInput.current!.value = id;
  };

  const addProduct = async () => {
    const id = IdInput.current?.value.trim();
    const name = NameInput.current?.value.trim();
    const price = PriceInput.current?.value.trim();
    const Availablety = AvailableInput.current?.value.trim();

    if (!id || !name || !price) {
      toast.error("Please enter All Fields");
      return;
    }
    const isExsist = await getProductById(id);
    if (isExsist) {
      toast.error("Product Already Exsist");
      return;
    }
    const newProduct: Product = {
      price: +price,
      productId: id,
      available:
        (Availablety as ProductAvilability) || ProductAvilability.inStock,
      productName: name,
    };
    await AddNewProduct(newProduct);
    toast.success("Product Added Successfully");

    IdInput.current!.value = "";
    PriceInput.current!.value = 1 + "";
    NameInput.current!.value = "";
  };

  const searchForUpdate = async () => {
    const id = IdInput.current?.value.trim();
    if (!id) {
      toast.error("Set Id Field");
      return;
    }
    const isExsist = await getProductById(id + "");
    if (!isExsist) {
      toast.error("Product Not Found");
      return;
    }
    const proudct: Product | null = await getProductById(id);

    if (!proudct) {
      toast.error("Product Not Found");
      return;
    }

    IdInput.current!.value = proudct?.productId;
    PriceInput.current!.value = proudct?.price.toString();
    NameInput.current!.value = proudct.productName;
    setIsUpdated(true);
  };

  const onCancelBtn = () => {
    setIsUpdated(false);
    IdInput.current!.value = "";
    PriceInput.current!.value = 1 + "";
    NameInput.current!.value = "";
  };
  const onDeleteBtn = async () => {
    setIsUpdated(false);
    const id = IdInput.current?.value.trim();
    await DeleteProduct(id + "");

    IdInput.current!.value = "";
    PriceInput.current!.value = 1 + "";
    NameInput.current!.value = "";

    toast.success("Product Deleted Successfully");
  };

  const onUpdateBtn = async () => {
    const id = IdInput.current?.value.trim();
    const name = NameInput.current?.value.trim();
    const price = PriceInput.current?.value.trim();
    const Availablety = AvailableInput.current?.value.trim();
    if (!id || !name || !price) {
      toast.error("Please enter All Fields");
      return;
    }

    const newProduct: Product = {
      price: +price,
      productId: id,
      available:
        (Availablety as ProductAvilability) || ProductAvilability.inStock,
      productName: name,
    };

    await UpdateProduct(newProduct);
    IdInput.current!.value = "";
    PriceInput.current!.value = 1 + "";
    NameInput.current!.value = "";
    setIsUpdated(false);
    toast.success("Product Updated Successfully");
  };

  return (
    <div>
      <div className="addPeoduct p-5 flex flex-col justify-between gap-5">
        <ScreenReader setScaningData={scannCorect} />
        <div className="se flex item-center  justify-between  ">
          <input
            ref={IdInput}
            type="text"
            placeholder="Product Id..."
            disabled={IsUpdated}
            className={` outline-none w-[90%] outline-primaryColor  p-3 `}
          />

          {!IsUpdated && (
            <button
              onClick={searchForUpdate}
              className="w-fit rounded-md p-3 bg-primaryColor"
            >
              <CiSearch className="text-white fond-bold text-2xl " />
            </button>
          )}
        </div>

        <input
          ref={NameInput}
          type="text"
          placeholder="ProductName..."
          className="outline-none outline-primaryColor  p-4  "
        />
        <input
          ref={PriceInput}
          type="number"
          placeholder="Price..."
          className="outline-none p-3   outline-primaryColor  "
        />
        <select
          ref={AvailableInput}
          className="outline-none outline-primaryColor  p-3 "
        >
          <option defaultValue={ProductAvilability.inStock}>
            {ProductAvilability.inStock}
          </option>
          <option defaultValue={ProductAvilability.outOfStock}>
            {ProductAvilability.outOfStock}
          </option>
        </select>
      </div>
      <button
        onClick={addProduct}
        className={`bg-primaryColor ${
          !IsUpdated ? "block" : "hidden"
        } text-white text-center font-bold rounded-md py-2 px-5 hover:scale-105 transition-all active:scale-95`}
      >
        Add
      </button>
      <div
        className={`updateBtns items-center justify-around ${
          IsUpdated ? "flex" : "hidden"
        } `}
      >
        <button
          onClick={onUpdateBtn}
          className={`   bg-orange-400  text-white text-center font-bold rounded-md py-2 px-5 hover:scale-105 transition-all active:scale-95`}
        >
          Update
        </button>

        <button
          onClick={onCancelBtn}
          className={`bg-danger  text-white text-center font-bold rounded-md py-2 px-5 hover:scale-105 transition-all active:scale-95`}
        >
          Cancel
        </button>
        <button
          onClick={onDeleteBtn}
          className={`bg-danger  text-white text-center font-bold rounded-md py-2 px-5 hover:scale-105 transition-all active:scale-95`}
        >
          <FcFullTrash className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ProudctFrom;
