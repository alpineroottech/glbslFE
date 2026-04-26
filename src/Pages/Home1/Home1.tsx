import React from "react";
import Action from "../../Components/CallDoAction/Action";
import Facilities from "../../Components/Facilities/Facilities";
import HeroSection from "../../Components/HeroSection/HeroSection";
// import HotelAndFacilities from "../../Components/HotelAndFacilities/HotelAndFacilities";
// import LatestBlog from "../../Components/LatestBlog/LatestBlog";
import Offers from "../../Components/Offers/Offers";
import Reports from "../../Components/Reports/Reports";
import Rooms from "../../Components/Rooms/Rooms";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Home1: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Rooms />
      {/* <HotelAndFacilities /> */}
      <Action />
      <Facilities />
      <Offers />
      <Reports />
      {/* Testimonial section hidden per client request */}
      {/* <Testimonial /> */}
      {/* <LatestBlog /> */}
    </>
  );
};

export default Home1;
