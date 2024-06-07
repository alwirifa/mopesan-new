import React from "react";
import Container from "../Container";
import Image from "next/image";
import Download from "../header/Download";

const Banner = () => {
  return (
    <div className="py-12 flex items-center">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="flex flex-col gap-4 text-center lg:text-left lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold md:leading-snug leading-tight">
              Kini, pesan makan lebih mudah & praktis.
            </h1>
            <p className="mt-4">
              Dengan aplikasi MoPesan dari Koruruk, nikmati kemudahan dalam memesan makanan favorit Anda hanya dengan beberapa klik.
            </p>
            <div className="mt-4 w-full flex justify-center lg:mt-0 md:block">
              <Download />
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/home/heroImageTitle.webp"
              alt="banner home"
              width={705}
              height={498}
              className="w-full h-auto max-w-md lg:max-w-none"
            />
          </div>
        </div>
  
      </Container>
    </div>
  );
};

export default Banner;
