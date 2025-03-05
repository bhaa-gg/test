export interface Product {
    productId: string;
    productName: string;
    stock?: number;
    price: number;
    quantity?: number | undefined | null;
    totalPrice?: number | undefined | null;
    available?: ProductAvilability
}

export enum ProductAvilability {
    inStock = "inStock",
    outOfStock = "outOfStock",
}
export interface Transaction {
    id: number;
    totalPrice: number;
    time?: string;
    products: Product[];
}

export interface DaySales {
    day: string;
    DaySales: Transaction[];
}
