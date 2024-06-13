"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "@/app/components/Heading";
import Search from "@/app/components/Search";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import FeeModal from "@/app/components/modal/fee/FeeModal";
import { useFeeModal } from "@/app/hooks/fee/useFeeModal";
import { useConfirmModal } from "@/app/hooks/confirm/useConfirmModal";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/app/lib/formatter";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Sort from "@/app/components/Sort";

const sortOptions = [
  { value: "ASC", label: "Ascending" },
  { value: "DESC", label: "Descending" },
];

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";
  const [fees, setFees] = useState<any[]>([]);
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const feeModal = useFeeModal();
  const confirmModal = useConfirmModal();
  const [selectedFee, setSelectedFee] = useState<any>(null);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/config-fee?search=${query}`
        );
        const data = response.data.data;
        setFees(data);
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
    };

    fetchFees();
  }, [query]);

  const handleSortChange = (selectedSort: string) => {
    setSort(selectedSort);
  };

  const handleFeeStatusChange = (fee: any) => {
    setSelectedFee(fee);
    confirmModal.onOpen();
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in local storage");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const newIsActive = !selectedFee.is_active;

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/config-fee/switch/${selectedFee.id}`,
        { is_active: newIsActive },
        config
      );

      setFees((prevFees) =>
        prevFees.map((fee) =>
          fee.id === selectedFee.id ? { ...fee, is_active: newIsActive } : fee
        )
      );

      confirmModal.onClose();
    } catch (error) {
      console.error("Error updating fee status:", error);
    }
  };

  if (!fees) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <Heading
        title="Additional Fee"
        subtitle="List of all additional fee"
        buttonTitle="+ Add Additional Fee"
        onButtonClick={feeModal.onOpen}
      />
      <div className="w-full flex justify-between items-center my-4">
        <div className="flex gap-4">
          <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />
        </div>
        <Search placeholder="Search ..." />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">
        {fees.map((fee, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md mt-6 z-40">
            <div className="border-b p-4 border-primary flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-[24px] font-semibold capitalize">
                  {fee.configuration_name}
                </h1>
                <p className="text-sm italic text-textGray">
                  Last Updated {formatDate(fee.updated_at)}
                </p>
              </div>
              <div className={ fee.value_type === 'percentage' ? `px-3 py-1 rounded-full bg-secondary text-primary text-sm` : `px-3 py-1 rounded-full bg-[#CEDFEF] text-[#0B60B0] text-sm`}>
                {fee.value_type}
              </div>
            </div>
            <div className='flex flex-col gap-2 p-4'>
              <p className="italic text-textGray">Value</p>
              <h1 className="text-3xl font-bold">{fee.value}</h1>
            </div>
            <div
              className={ `z-10 text-primary pt-4 px-4 pb-4 rounded-b-xl flex justify-between bg-neutral-100` }
            >
              <p className="text-[16px] font-semibold">Active Status</p>
              <Switch
                checked={fee.is_active}
                onClick={() => handleFeeStatusChange(fee)}
              />
            </div>
          </div>
        ))}
      </div>
      <FeeModal />
      <div className="absolute bottom-4 right-4 z-40">
        <ConfirmModal
          onConfirm={handleConfirm}
          status={selectedFee?.is_active}
        />
      </div>
    </div>
  );
};

export default Page;
