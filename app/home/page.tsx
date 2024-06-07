import React from "react";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import Section1 from "./components/section1/Section1";
import Footer from "./components/footer/Footer";
import Section2 from "./components/section2/Section2";
import Section3 from "./components/section3/Section3";
import Section4 from "./components/section4/Section4";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Header />

   
      <Banner />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
};

export default page;
