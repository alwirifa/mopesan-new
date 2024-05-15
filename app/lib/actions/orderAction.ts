// actions/orderActions.ts

import axios from "axios";
import { OrderData } from "../types";

export async function getOrder(): Promise<OrderData[]> {
  try {
    
    // const token = localStorage.getItem("admin_token");
    // if (!token) {
    //   throw new Error("Admin token not found");
    // }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/orders`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getOrderByMerchant(): Promise<OrderData[]> {
  try {
    
    // const token = localStorage.getItem("admin_token");
    // if (!token) {
    //   throw new Error("Admin token not found");
    // }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/orders`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}