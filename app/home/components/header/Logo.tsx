"use client";

import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image 
        src={"/home/logo.webp"} 
        alt="logo" 
        width={250}
        height={81} 
      />
    </div>
  );
};

export default Logo;
