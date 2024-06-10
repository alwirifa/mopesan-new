"use client";

import { useContext, useEffect, useState } from "react";
import { getMerchantById } from "@/app/api/merhchant";
import Content from "./Content";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { UserContext } from "@/app/context/UserContext";

export default function Admin() {
  const [merchant, setMerchant] = useState<any | null>(null);
  const { user } = useContext(UserContext);
  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Admin token not found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants/${user.merchant_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMerchant(response.data.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error get data by id:", error);
      }
    };

    fetchData();
  }, [user.merchant_id]);

  if (!merchant) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  return (
    <>
      <>
        <Content
          key={merchant.id}
          id={merchant.id}
          is_open={merchant?.is_open}
          merchant_name={merchant?.merchant_name}
          phone_number={merchant?.phone_number}
          address={merchant?.address}
          pic_name={merchant?.pic_name}
          daily_order_active={merchant?.daily_order_active}
          daily_order_delivered={merchant?.daily_order_delivered}
          daily_order_cancelled={merchant?.daily_order_cancelled}
          daily_earning={merchant?.daily_earning}
        />
     
      </>
    </>
  );
}
