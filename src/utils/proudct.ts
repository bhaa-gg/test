"use server"
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import { Product } from "@/Types/a";

export const getAllProducts = async () => {
    const salesFilePath = path.join(process.cwd(), "Data", "products.json");
    const AllProducts = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    return AllProducts
}

export const AddNewProduct = async (newProduct: Product) => {
    const salesFilePath = path.join(process.cwd(), "Data", "products.json");
    const userDemo = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    const newData = [...userDemo, newProduct];
    writeFileSync(salesFilePath, JSON.stringify(newData));
}

export const DeleteProduct = async (id: string) => {
    const salesFilePath = path.join(process.cwd(), "Data", "products.json");
    const AllProducts: Product[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    const newestProducts = AllProducts.filter(p => p.productId != id);
    writeFileSync(salesFilePath, JSON.stringify(newestProducts));
}


export const UpdateProduct = async (newProduct: Product) => {
    const salesFilePath = path.join(process.cwd(), "Data", "products.json");
    const Products: Product[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));

    Products.forEach(p => {
        if (p.productId === newProduct.productId) {
            p.available = newProduct.available;
            p.price = newProduct.price;
            p.productName = newProduct.productName;
        }
    })
    writeFileSync(salesFilePath, JSON.stringify(Products));

}





export const getProductById = async (id: string) => {
    const salesFilePath = path.join(process.cwd(), "Data", "products.json");
    const allProducts: Product[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    const p = allProducts.find(product => product.productId === id)
    return p?.productId ? p : null;
}




export const getProductByName = async (Name: string) => {
    const salesFilePath = path.join(process.cwd(), "Data", "products.json");
    const allProducts: Product[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    const p = allProducts.find(product => product.productName === Name)
    return p?.productId ? p : null;
}
