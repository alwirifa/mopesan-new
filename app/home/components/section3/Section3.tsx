import Image from "next/image";
import React from "react";
import Container from "../Container";

const Section3 = () => {
  return (
    <div className="py-12 sm:py-16 md:py-24 xl:py-32 px-4 sm:px-8 md:px-16 w-full bg-primary">
      <Container>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold text-white mb-6 sm:mb-0">
              Stamp Hero! Perbanyak transaksi, dapatkan menu gratis!
            </h1>
            <p className="text-sm sm:text-base text-white font-light max-w-md mt-4">
              Dapatkan 1 stamp tiap pembelian Rp. 85.000. Kumpulkan 5 stempel,
              dan dapatkan menu gratis pilihan kami!
            </p>
          </div>
          <div className="flex-1 mt-6 sm:mt-0">
            <Image
              src="/home/stampHero.webp"
              alt="image"
              width={705}
              height={498}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Section3;
