import Image from "next/image";
import React from "react";

const Download = () => {
  return (
    <div className="max-w-max px-4 py-2 rounded-full flex gap-2 items-center bg-primary text-white font-semibold cursor-pointer hover:bg-primary/80 mt-4 sm:mt-0">
      <Image
        src={"/icons/download.svg"}
        width={20}
        height={20}
        alt="download"
      />
      <p>Download Sekarang</p>
    </div>
  );
};

export default Download;
