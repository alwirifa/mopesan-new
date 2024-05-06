"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



const Page = () => {
  const router = useRouter()

  const handleClose = () => {
    router.push('/dashboard/promotionalBanner')
  }

  return (
    <div className="p-8 rounded-lg bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-4xl font-semibold">Add Promotional Banner</h1>
        <div onClick={handleClose} className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
          <img src="/icons/close.svg" alt="close"  className="h-full w-full"/>
        </div>
      </div>

    
    </div>
  );
};

export default Page;
