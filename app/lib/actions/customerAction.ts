// /api/v1/customers

import axios from "axios";

// READ
export const getCustomers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers`
      );
      const { data } = response.data;
      console.log("customers data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch customers");
    }
  };
