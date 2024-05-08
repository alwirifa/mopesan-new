"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Search from "@/app/ui/dashboard/search/Search";
import Link from "next/link";

type Admin = {
  id: number;
  name: string;
  email: string;
  permission: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
};

const Page: React.FC = () => {
  const router = useRouter();





  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Promotional banner</h1>
          <p>Activate & Deactivate promotional banner for customer</p>
        </div>
        <div>
          <Link
          href='/dashboard/promotionalBanner/add'
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Promotional Banner
          </Link>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="bg-white flex gap-3 px-4 py-3 rounded-lg shadow-md">
            <img src="/icons/filter.svg" alt="" />
            <p>Filter</p>
          </div>
          <div className="bg-white flex gap-3 px-4 py-3 rounded-lg shadow-md">
            <img src="/icons/sort.svg" alt="" />
            <p>Sort</p>
          </div>
        </div>

        <Search placeholder="Search ..." />
      </div>

      <div className="grid grid-cols-2 gap-8 mt-5 ">

        <div className="flex flex-col gap-4 bg-white rounded-md border border-maroon p-4">
          <div>

            <h1 className="text-lg font-semibold">Promotional Banner</h1>
            <p className="text-xs italic">Date Added:</p>
          </div>
          <div className="border-b"></div>
          <div className="border border-maroon rounded-md">
            <img src="/images/contoh.svg" alt="" />
          </div>
        </div>


      </div>

    </div>
  );
};

export default Page;
