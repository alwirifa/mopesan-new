"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import Search from "@/app/components/Search";
import Heading from "@/app/components/Heading";
import { useNotifModal } from "@/app/hooks/notif/useNotifModal";
import NotifModal from "@/app/components/modal/notif/NotifModal";
import { UserContext } from "@/app/context/UserContext";

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
  const [dataTabel, setDataTabel] = useState<any[]>([]);

  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 8;
  const [totalPages, setTotalPages] = useState<any>({});

  useEffect(() => {
    handleSave();
  }, [searchParams?.page, query]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/events?search=${query}&sort=${sort}&page=${currentPage}&limit=${limit}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dataTabel = response.data.data.events;
      const pages = response.data.data.total_pages;
      setTotalPages(pages);
      console.log(response.data);
      console.log("data tabel", dataTabel);
      console.log("pages", pages);
      setDataTabel(dataTabel);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleSortChange = (selectedSort: string) => {
    setSort(selectedSort);
  };

  const { user } = useContext(UserContext);
  const notifModal = useNotifModal();

  return (
    <div className="">
      {user?.role_keyword === "admin_merchant" ? (
        <Heading
          title="Promotional Notifications"
          subtitle="List of all notifications"
        />
      ) : (
        <Heading
          title="Promotional Notifications"
          subtitle="List of all notifications"
          buttonTitle="+ Blast Notification"
          onButtonClick={notifModal.onOpen}
        />
      )}

      <div className="h-full w-full mt-8 p-8 bg-white rounded-lg flex flex-col gap-4">
        {/* =====================  PENGATURAN  ====================== */}
        <div className="w-full flex justify-between">
          {/* <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "} */}
          <div></div>
          <Search placeholder="Search ..." />
        </div>
        {/* =====================  TABLE  ====================== */}
        <Table data={dataTabel} />
        <div className="w-full flex justify-end mt-4">
          {dataTabel === null ? <></> : <Pagination totalPages={totalPages} />}
        </div>
        <NotifModal />
      </div>
    </div>
  );
};

export default Page;
