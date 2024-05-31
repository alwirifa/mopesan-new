"use client";

import { getFee } from "@/app/api/fee";
import Heading from "@/app/components/Heading";
import Search from "@/app/components/Search";
import Card from "@/app/components/fee/Card";
import AdminModal from "@/app/components/modal/admin/AdminModal";
import FeeModal from "@/app/components/modal/fee/FeeModal";
import { useAdminModal } from "@/app/hooks/admin/useAdminModal";
import { useFeeModal } from "@/app/hooks/fee/useFeeModal";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    selectedMonth?: string;
    selectedYear?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const feeModal = useFeeModal();
  const [fee, setFee] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/config-fee?search=${query}`
        );

        const data = response.data.data;
        setFee(data);
        
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, [query]);

  return (
    <div>
      <div className="flex flex-col gap-8">
        <Heading
          title="Additional Fee"
          subtitle="List of all additional fee"
          buttonTitle="+ Add Additional Fee"
          onButtonClick={feeModal.onOpen}
        />
        <Search placeholder="search"/>
      </div>
      <div className="grid grid-cols-3 gap-x-8 gap-y-4">
        {fee.map((data, index) => (
          <Card
            key={index}
            last_updated={data.updated_at}
            value_type={data.value_type}
            configuration_name={data.configuration_name}
            value={data.value}
            id={data.id}
            is_active={data.is_active}
          />
        ))}
      </div>
      <FeeModal />
    </div>
  );
};

export default Page;
