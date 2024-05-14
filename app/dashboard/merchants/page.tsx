"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMerchants } from "@/app/lib/actions/merchantsActions"; 
import { Merchant } from '@/app/lib/types/index'
import { useMerchantModal } from "@/app/hooks/merchant/useMerchantModal";

const Page: React.FC = () => {
  const router = useRouter();
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchantsData = await getMerchants();
        setMerchants(merchantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  // const changeMerchantStatus = (merchantId: number) => {
  //   setMerchants(prevMerchants =>
  //     prevMerchants.map(merchant =>
  //       merchant.id === merchantId ? { ...merchant, is_open: !merchant.is_open } : merchant
  //     )
  //   );
  // };

  const merchantModal = useMerchantModal()

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Merchants</h1>
          <p>List of Merchants</p>
        </div>
        <div>
          {/* <button
            onClick={addMerchant}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Merchant
          </button> */}
          <button
             onClick={merchantModal.onOpen}
             className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
          + Add Merchant
          </button>
        </div>
      </div>

      <section className="flex gap-6">
        <div className=" w-full grid grid-cols-2 gap-4">
          {merchants.length > 0 ? (
            merchants.map((merchant, index) => (
              <div
                key={index}
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
                    // onClick={() => changeMerchantStatus(merchant.id)}
                    className={`absolute right-0 max-h-max px-4 py-2 rounded-full text-sm ${merchant.is_open ? "bg-buttonGreen text-textGreen" : "bg-buttonRed text-textRed"
                      }`}
                  >
                    {merchant.is_open ? "Open" : "Closed"}
                  </button>
                </div>
                <p className="text-sm text-textGray">{merchant.address}</p>
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
