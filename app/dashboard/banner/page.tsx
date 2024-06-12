"use client"

import React, { useEffect, useState } from "react";
import Heading from "@/app/components/Heading";
import BannerCard from "./BannerCard";
import Search from "@/app/components/Search";
import BannerModal from "@/app/components/modal/banner/BannerModal";
import { useBannerModal } from "@/app/hooks/banner/useBannerModal";
import axios from "axios";
import Sort from "@/app/components/Sort";
import Filter from "@/app/components/Filter";
import { Loader2 } from "lucide-react";

const sortOptions = [
  { value: "ASC", label: "Ascending" },
  { value: "DESC", label: "Descending" },
];

const Page = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const [banners, setBanners] = useState<any[]>([]);

  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const bannerModal = useBannerModal();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner?sort=${sort}&search=${query}`
        );
        setBanners(response.data.data.banners);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBanners();
  }, [query, sort]);

  // OVERFLOW HIDDEN SAAT MODAL TERBUKA
  useEffect(() => {
    if (bannerModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Restore default overflow
    }
  }, [bannerModal.isOpen]);

  const handleSortChange = (selectedSort: string) => {
    setSort(selectedSort);
  };

  if (!banners) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="animate-spin size-12 text-primary" />
      </div>
    );
  }


  return (
    <div>
      <Heading
        title="Promotional Banner"
        subtitle="Active & Deactive promotional banner for customer"
        buttonTitle="+ Add Promotional Banner"
        onButtonClick={bannerModal.onOpen}
      />
      <div className="w-full flex justify-between items-center my-4">
        <div className="flex gap-4">

        {/* <Filter onFilterChange={handleSortChange} filterOptions={sortOptions} />{" "} */}
        <Sort onSortChange={handleSortChange} sortOptions={sortOptions} />{" "}
     
        </div>
        <Search placeholder="Search ..." />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">
        {banners.map((data, index) => (
          <BannerCard
            key={index}
            query={query}
            id={parseFloat(data.id)}
            is_active={data.is_active}
            banner_name={data.banner_name}
            banner_image={data.banner_image}
            created_at={data.created_at}
          />
        ))}
      </div>
      <BannerModal />
    </div>
  );
};

export default Page;
