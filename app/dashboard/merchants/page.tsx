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

const Page: React.FC = () => {
  const router = useRouter();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [merchantStatus, setMerchantStatus] = useState(true);
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

    return () => {};
  }, []);

  const addMerchant = () => {
    router.push("/dashboard/merchant/add");
  };

  const changeMerchantStatus = () => {
    setMerchantStatus(!merchantStatus);
  };

  const goToMerchantDetail = (merchantId: number) => {
    router.push(`/dashboard/merchants/${merchantId}`);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Merchants</h1>
          <p>List of Merchants</p>
        </div>
        <div>
          <button
            onClick={addMerchant}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Merchant
          </button>
        </div>
      </div>

      <section className="flex gap-6">
        <div className=" w-full grid grid-cols-2 gap-4">
          {merchants.length > 0 ? (
            merchants.map((merchant) => (
              <div
                key={merchant.merchant_name}
                className="p-6 flex flex-col gap-4 rounded-md bg-white"
              >
                <div className="flex items-center gap-4 relative">
                  <img
                    src="/icons/store.svg"
                    alt=""
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-semibold">
                      {merchant.merchant_name}
                    </p>
                    <p className="text-sm text-textGray">
                      Opening Hours: 11:00 - 22:30
                    </p>
                  </div>

                  <button
                    onClick={changeMerchantStatus}
                    className="absolute right-0 max-h-max px-4 py-2 rounded-full text-sm bg-buttonGreen text-textGreen"
                  >
                    Open
                  </button>
                </div>
                <p className="text-sm text-textGray">{merchant.address}</p>
                {/* <Link
                  href={{
                    pathname: `/dashboard/merchants/${merchant.id}`,
                    query: {
                      id: `${merchant.id}`,
                    },
                  }}
                >
                  <button>View</button>
                </Link> */}
                <Link href={`/dashboard/merchants/${merchant.id}`}>
                  <button>View</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No merchants available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
