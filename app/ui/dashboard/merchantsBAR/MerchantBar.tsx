"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Merchant = {
  id: number;
  merchant_name: string;
  address: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const MerchantBar: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/merchants`
        );
        const { data } = response.data;
        console.log("Merchants data:", data);
        setMerchants(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const renderMerchantStatus = (isActive: boolean) => {
    return isActive ? (
      <div className="px-4 py-2 rounded-full text-sm bg-buttonGreen text-textGreen">
        Open
      </div>
    ) : (
      <div className="px-4 py-2 rounded-full bg-buttonRed text-textRed">
        Close
      </div>
    );
  };

  return (


    <div className="grid grid-cols-3 gap-4">
      {merchants.slice(0, 3).map((merchant, index) => (
        <Link href={`/dashboard/merchants/${merchant.id}`}>
          <div key={merchant.id} className="bg-white flex items-center justify-between py-4 px-6 rounded-md shadow-custom">
            <div className="flex gap-4 items-center">
              <img src="/icons/merchantLogo.svg" alt="" className="h-16 w-16" />
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">{merchant.merchant_name}</p>
                <p className="text-sm text-textGray">{merchant.address}</p>
              </div>
            </div>
            {renderMerchantStatus(merchant.is_active)}
          </div>
        </Link>
      ))}

    </div>
  );
};

export default MerchantBar;
