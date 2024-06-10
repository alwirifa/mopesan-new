"use client";

import { useEffect, useState } from "react";
import { getMerchantById } from "@/app/api/merhchant";
import Content from "./Content";
import { Loader2 } from "lucide-react";

export default function Home({ params }: { params: { id: string } }) {
  const [merchant, setMerchant] = useState<any | null>(null);

  useEffect(() => {
    if (params && params.id) {
      getMerchantById(params.id)
        .then((data) => {
          setMerchant(data);
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    }
  }, [params]);

  if (!merchant) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }



  return (
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
  );
}
