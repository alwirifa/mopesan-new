"use client";

import { formatDate } from "@/app/lib/formatter";
import { Switch } from "@/components/ui/switch";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  query: string;
  is_active: boolean;
  id: number;
  banner_name: string;
  banner_image: string;
  created_at: string;
};

const BannerCard: React.FC<Props> = ({
  id,
  is_active,
  banner_name,
  banner_image,
  created_at,
}) => {
  const [isActive, setIsActive] = useState(is_active);

  const handleSwitch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found in local storage");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const newIsActive = !isActive;
      setIsActive(newIsActive);

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/banner/switch/${id}`,
        { is_active: newIsActive },
        config
      );
      console.log("success")
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  return (
    <div className="w-full bg-white p-6 rounded-lg ">
      <div className="border-b pb-4 border-primary flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] font-semibold capitalize">
            {banner_name}
          </h1>
          <p className="text-sm italic text-textGray">
            Date Added {formatDate(created_at)}
          </p>
        </div>
        <Switch checked={isActive} onClick={handleSwitch} />
      </div>
      <div className="flex justify-center items-center p-4">
        <img src={banner_image} className="h-full w-auto bg-contain" />
      </div>
    </div>
  );
};

export default BannerCard;
