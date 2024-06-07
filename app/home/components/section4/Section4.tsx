import React from "react";
import Container from "../Container";
import Image from "next/image";

const Section4 = () => {
  return (
    <div className="py-16 md:py-32 w-full z-10"> {/* Changed z-40 to z-10 */}
      <Container>
        <div className="relative flex flex-col justify-center gap-4">
          <div className="px-6 flex justify-center">
            <img
              src="/home/heroImage.webp"
              alt=""
              className="h-[30vh] md:h-[50vh] w-auto bg-contain md:absolute md:-top-8 md:left-20"
            />
          </div>
          <img
            src="/home/section4.svg"
            className="h-[40vh] w-full bg-contain sm:flex hidden"
          />
          <div className="md:absolute md:top-6 md:right-16 max-w-xl p-4 md:p-16 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold md:text-white text-primary">
              Unduh Sekarang dan nikmati promo menarik tiap harinya.
            </h1>
            <p className="text-primary md:text-white">
              Gak perlu lagi mikirin lapar karena pesan makanan jadi super
              gampang! Temukan beragam makanan kekinian favoritmu. Mulai dari
              jajanan hits sampai makanan favoritmu,
            </p>
            <div className="mt-2 max-w-max px-6 py-2 rounded-full flex gap-2 items-center bg-white text-primary border-primary border font-semibold cursor-pointer">
              <Image
                src={"/home/downloadOrange.svg"}
                width={20}
                height={20}
                alt="download"
              />
              <p>Download Sekarang</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Section4;
