import React from "react";
import Action from "../../Components/CallDoAction/Action";
import Facilities from "../../Components/Facilities/Facilities";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Offers from "../../Components/Offers/Offers";
import Reports from "../../Components/Reports/Reports";
import ProductsSlider from "../../Components/Rooms/Rooms";

const Home1: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ProductsSlider />
      <Action />
      <Facilities />
      <Offers />
      <Reports />
    </>
  );
};

export default Home1;
