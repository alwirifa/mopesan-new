import React from "react";
import Container from "../Container";
import Logo from "../header/Logo";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-primary py-8">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center text-white">
          <div className="mb-4 sm:mb-0">
            <Logo />
          </div>
          <p className="text-center text-sm mb-4 sm:mb-0">
            © 2024 MoPesan by Koruruk | All Right Reserved
          </p>
          <div className="flex gap-6">
            <Image src="/home/instagram.svg" width={25} height={25} alt="Instagram" />
            <Image src="/home/globe.svg" width={25} height={25} alt="Website" />
            <Image src="/home/whatsapp-svgrepo-com 1.svg" width={25} height={25} alt="WhatsApp" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
