"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMerchantModal } from "@/app/hooks/merchant/useMerchantModal";
import { Merchant } from "@/app/types/types";
import { getMerchants } from "@/app/api/merhchant";
import { formatTime } from "@/app/lib/formatter";
import Heading from "@/app/components/Heading";
import MerchantModal from "@/app/components/modal/merchant/MerchantModal";
import Image from "next/image";
import axios from "axios";
import { UserContext } from "@/app/context/UserContext";

const Superadmin: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const merchantModal = useMerchantModal();

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

    return () => {};
  }, []);


  // OVERFLOW HIDDEN SAAT MODAL TERBUKA
  useEffect(() => {
    if (merchantModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Restore default overflow
    }
  }, [merchantModal.isOpen]);

  const { user } = useContext(UserContext);


  if (user?.role_keyword === "admin_merchant") {
    return "finnace";
  }



  return (
    <div className="flex flex-col gap-6 ">
      <Heading
        title="Merchants"
        subtitle="List of all merchant"
        buttonTitle="+ Add Merchant"
        onButtonClick={merchantModal.onOpen}
      />
      <section className="flex gap-6">
        <div className="w-full grid grid-cols-2 gap-4">
          {merchants.length > 0 ? (
            merchants.map((merchant) => (
              <Link
                key={merchant.id}
                href={`/dashboard/merchant/${merchant.id}`}
              >
                <div className="p-6 flex flex-col gap-4 rounded-md bg-white">
                  <div className="flex items-center gap-4 relative">
                    <Image
                      src="/icons/merchantLogo.svg"
                      alt="merchant logo"
                      className="rounded-full"
                      height={64}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-3xl font-semibold">
                        {merchant.merchant_name}
                      </p>
                      <p className="text-sm text-textGray">
                        Opening Hours:{" "}
                        {formatTime(merchant.operating_hours.opening_hours)} -{" "}
                        {formatTime(merchant.operating_hours.closing_hours)}
                      </p>
                    </div>
                    <button
                      className={`absolute right-0 max-h-max px-4 py-2 rounded-full text-sm ${
                        merchant.is_open
                          ? "bg-buttonGreen text-textGreen"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {merchant.is_open ? "Open" : "Closed"}
                    </button>
                  </div>
                  <p className="text-sm text-textGray">{merchant.address}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No merchants available</p>
          )}
        </div>
      </section>
      <MerchantModal />
    </div>
  );
};

export default Superadmin;
