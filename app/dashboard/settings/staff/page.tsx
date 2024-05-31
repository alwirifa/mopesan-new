"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Heading from "@/app/components/Heading";
import Search from "@/app/components/Search";
import { useStaffModal } from "@/app/hooks/staff/useStaffModal";
import StaffModal from "@/app/components/modal/staff/StaffModal";

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const [dataCard, setDataCard] = useState<any[]>([]);
  const [periodicData, setPeriodicData] = useState<any>({});
  const [sort, setSort] = useState("ASC");
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    handleSave();
  }, [searchParams?.page]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/orders/admin/between?sort=${sort}&offset=${offset}&limit=${limit}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      const dataCard = response.data.data.orders;
      setPeriodicData(data);
      setDataCard(dataCard);
      console.log(dataCard);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const staffModal = useStaffModal();

  return (
    <div>
      <Heading
        title="Staff"
        subtitle="List of all staff"
        buttonTitle="+ Add Staff"
        onButtonClick={staffModal.onOpen}
      />
      <div className="h-full w-full mt-8 p-8 bg-white rounded-lg flex flex-col gap-4">
        <div className="flex justify-between">
          <Sort onSortChange={handleSortChange} />{" "}
          <Search placeholder="Search ..." />
        </div>
        <Table data={dataCard} />
      </div>
      <div className="w-full flex justify-end mt-4">
        <Pagination
          totalPages={Math.ceil(1 / limit)}
        />
      </div>
      <StaffModal />
    </div>
  );
};

export default Page;
