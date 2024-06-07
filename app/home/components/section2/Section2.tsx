import Image from "next/image";
import React from "react";
import Container from "../Container";

const MenuList = [
  {
    img: "/home/food1.webp",
    category: "SNACK & SHARING",
    product_name: "Sunsal Yangnyeom Fried Chicken",
  },
  {
    img: "/home/food2.webp",
    category: "RICE & NOODLE",
    product_name: "Sunsal Yangnyeom Fried Chicken",
  },
  {
    img: "/home/food3.webp",
    category: "RICE BOWL",
    product_name: "Rice Bowl Honey Yangnyeom Chicken",
  },
  {
    img: "/home/food4.webp",
    category: "DOSIRAK",
    product_name: "Dosirak Yangnyeom Chicken",
  },
  {
    img: "/home/food5.webp",
    category: "TEOPOKI",
    product_name: "Original Teokpoki",
  },
];

const Section2 = () => {
  return (
    <div className="py-16 px-4 sm:py-24 sm:px-8 md:py-32 md:px-16 w-full bg-section2 bg-cover bg-center">
      <Container>
        <div className="w-full flex flex-col items-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">Menu Kami</h1>
          <p className="text-center max-w-2xl mt-4 text-base sm:text-lg md:text-xl">
            Berbagai pilihan lezat untuk berbagai jenis, mau nyemil cantik atau makan kenyang? Tenang, kami siap nyediain buat kamu!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {MenuList.map((menu, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <Image src={menu.img} alt={menu.product_name} width={250} height={250} />
              <div className="text-center">
                <p className="text-sm text-textGray">{menu.category}</p>
                <h1 className="text-lg font-semibold">{menu.product_name}</h1>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Section2;
