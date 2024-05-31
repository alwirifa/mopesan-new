"use client";

import { formatDate } from "@/app/lib/formatter";
import { Banner } from "@/app/types/types";
import { Switch } from "@/components/ui/switch";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  query: string;
};

const BannerCard: React.FC<Props> = ({ query }) => {
  const [banners, setBanners] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isActive, setIsActive] = useState(); // State for is_active


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/banner`
        );
        setBanners(response.data.data);
        setLoading(false);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const filteredData = banners.filter((movie: { banner_name: string; }) =>
    movie.banner_name.toLowerCase().includes(query)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSwitch = () => {

  }

  return (
    <div className="w-full ">
      <ul className="grid grid-cols-2 gap-8 mt-4 w-full">
        {filteredData.map((banner: { id: React.Key | null | undefined; banner_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; created_at: string; banner_image: string | undefined; }) => (
          <li className="bg-white rounded-lg p-6 shadow-md" key={banner.id}>
            <div className="border-b pb-4 border-primary flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-[24px] font-semibold capitalize">
                  {banner.banner_name}
                </h1>
                <p className="text-sm italic text-textGray">
                  Date Added {formatDate(banner.created_at)}
                </p>
              </div>
              <Switch checked={isActive} onClick={handleSwitch} />
            </div>
            <div className="flex justify-center items-center p-4">
              <img
                src={banner.banner_image}
        
                className="h-full w-auto bg-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BannerCard;
