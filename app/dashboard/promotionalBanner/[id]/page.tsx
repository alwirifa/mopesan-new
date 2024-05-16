"use client";

import { deleteBanner, getBannerByID } from "@/app/lib/actions/bannerActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Banner = {
  id: number;
  banner_name: string;
  description: string;
  banner_image: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    if (params && params.id) {
      getBannerByID(params.id)
        .then((data) => {
          setBanner(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching banner:", error);
        });
    }
  }, [params]);

  if (!banner) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={banner.banner_image} alt="" />
      <p>{banner.banner_name}</p>
      <p>{banner.description}</p>
      <Link href={`/dashboard/promotionalBanner/edit/${banner.id}`}>EDIT</Link>
      <button onClick={() => deleteBanner(String(banner.id))}>DELETE</button>
    </div>
  );
};

export default Page;
