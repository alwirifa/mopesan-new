"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/app/components/Heading";
import Search from "@/app/components/Search";
import BannerModal from "@/app/components/modal/banner/BannerModal";
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { useBannerModal } from "@/app/hooks/banner/useBannerModal";
import { useConfirmModal } from "@/app/hooks/confirm/useConfirmModal";
import axios from "axios";
import Sort from "@/app/components/Sort";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/app/lib/formatter";
import { Switch } from "@/components/ui/switch";

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
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";

  const [banners, setBanners] = useState<any[]>([]);
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const bannerModal = useBannerModal();
  const confirmModal = useConfirmModal();

  const [selectedBanner, setSelectedBanner] = useState<any>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner?sort=${sort}&search=${query}`
        );
        setBanners(response.data.data.banners);
        console.log(response.data.data);
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

  const handleBannerStatusChange = (banner: any) => {
    setSelectedBanner(banner);
    confirmModal.onOpen();
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in local storage");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const newIsActive = !selectedBanner.is_active;

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/banner/switch/${selectedBanner.id}`,
        { is_active: newIsActive },
        config
      );

      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === selectedBanner.id ? { ...banner, is_active: newIsActive } : banner
        )
      );

      confirmModal.onClose();
    } catch (error) {
      console.error("Error updating banner status:", error);
    }
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
          <div key={index} className="w-full bg-white p-6 rounded-lg ">
            <div className="border-b pb-4 border-primary flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-[24px] font-semibold capitalize">
                  {data.banner_name}
                </h1>
                <p className="text-sm italic text-textGray">
                  Date Added {formatDate(data.created_at)}
                </p>
              </div>
              <Switch
                checked={data.is_active}
                onClick={() => handleBannerStatusChange(data)}
              />
            </div>
            <div className="flex justify-center items-center p-4">
              <img src={data.banner_image} className="h-full w-auto bg-contain" />
            </div>
          </div>
        ))}
      </div>
      <BannerModal />
      <ConfirmModal onConfirm={handleConfirm} status={selectedBanner?.is_active} />
    </div>
  );
};

export default Page;
