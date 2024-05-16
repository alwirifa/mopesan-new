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

// GET DATA BY ID 
export async function getOrderById(merchantId: string): Promise<void> {
  try {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/${merchantId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      return data;
   
    } else {
      console.error("Unexpected response status:", response.status);
      throw new Error("Failed to fetch order by id");
      
    }
  } catch (error) {
    console.error("Error get data by id:", error);
  }
}