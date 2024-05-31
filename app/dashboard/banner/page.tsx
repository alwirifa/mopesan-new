"use client";

import React from "react";
import Heading from "@/app/components/Heading";
import BannerCard from "./BannerCard";
import Search from "@/app/components/Search";
import BannerModal from "@/app/components/modal/banner/BannerModal";
import { useBannerModal } from "@/app/hooks/banner/useBannerModal";

const Banner = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  const bannerModal = useBannerModal();

  return (
    <div>
      <Heading
        title="Promotional Banner"
        subtitle="Active & Deactive promotional banner for customer"
        buttonTitle="+ Add Promotional Banner"
        onButtonClick={bannerModal.onOpen}
      />
      <BannerModal />

      <div className="w-full flex justify-between">
        <div></div>
        <Search placeholder="Search ..." />
      </div>
      <BannerCard query={query} />
    </div>
  );
};

export default Banner;
