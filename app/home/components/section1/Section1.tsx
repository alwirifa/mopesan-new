import React from "react";
import Container from "../Container";
import Image from "next/image";

const Section1 = () => {
  return (
    <div className="py-32 w-full bg-section1 bg-cover bg-center">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-0 md:w-1/2">
            Kecepatan, Kualitas, Kemudahan. Tanpa perlu menunggu!
          </h1>
          <h3 className=" sm:text-lg  md:w-1/2">
            Beragam pilihan kuliner dari restoran terbaik, lebih mudah <br />{" "}
            tanpa harus menunggu. Kini lebih praktis dan menyenangkan!
          </h3>
        </div>
        <div className="mt-12 flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start">
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-8">
            <Image src="/home/usp1.webp" alt="Deals" width={300} height={300} />
            <div className="text-center md:text-left">
              <h1 className="text-lg sm:text-xl font-semibold">
                Berbagai deals menarik
              </h1>
              <p>Penawaran spesial dan diskon eksklusif setiap hari.</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-8">
            <Image
              src="/home/usp2.webp"
              alt="No Wait"
              width={300}
              height={300}
            />
            <div className="text-center md:text-left">
              <h1 className="text-lg sm:text-xl font-semibold">
                Pesan tanpa tunggu
              </h1>
              <p>Hanya sekali klik, tanpa perlu menunggu lama.</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-8">
            <Image
              src="/home/usp3.webp"
              alt="Daily Promo"
              width={300}
              height={300}
            />
            <div className="text-center md:text-left">
              <h1 className="text-lg sm:text-xl font-semibold">
                Promo menarik tiap hari
              </h1>
              <p>Promo harian menarik, lebih hemat, lebih puas!</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Section1;
