"use server"
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import { DaySales, Product } from "@/Types/a";
import { DateTime } from "luxon";

const salesFilePath = path.join(process.cwd(), "Data", "sales.json");

export const getDashBoardData = async () => {
    const DaysSales: DaySales[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    const today = DateTime.now().toISODate();

    const todaySales = DaysSales.find((d: DaySales) => d.day === today);
    if (!todaySales) {
        DaysSales.push({
            day: today,
            DaySales: []
        })
        writeFileSync(salesFilePath, JSON.stringify(DaysSales));
        return {
            day: today,
            totalRevenue: 0,
            orderCount: 0,
        }

    }


    const totalRevenue = todaySales?.DaySales.reduce((sum, transaction) => {
        return sum + transaction.totalPrice;
    }, 0);


    return {
        day: todaySales?.day,
        totalRevenue,
        orderCount: todaySales?.DaySales.length,
    }

}




export const makeOrder = async (order: Product[], totalPrice: number) => {
    const DaysSales: DaySales[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));
    const today = DateTime.now().toISODate();
    let curIn;
    const todaySales = DaysSales.find((d: DaySales, i: number) => {
        if (d.day === today) {
            curIn = i
            return d.day === today
        }
    });

    const newId = (todaySales?.DaySales.length || 0) + 1;

    DaysSales.at(curIn || 0)?.DaySales.push({
        id: newId,
        totalPrice,
        products: order,
        time: DateTime.now().toFormat("hh:mm:ss a")
    });

    writeFileSync(salesFilePath, JSON.stringify(DaysSales));

}





export const getAllOrders = async () => {
    const DaysSales: DaySales[] = JSON.parse(readFileSync(salesFilePath, "utf-8"));

    return DaysSales;
}



