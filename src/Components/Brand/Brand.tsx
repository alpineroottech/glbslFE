import React from "react";
const Brand: React.FC = () => {
  return (
    <div className="relative z-10 bg-khaki pt-[54px] pb-[44px]">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-Garamond font-semibold text-lightBlack">
          Our Payment Partners
        </h3>
      </div>
      <div
        className="Container flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <img src="/images/home-1/brand-1.png" alt="Payment partner 1" className="h-24 w-24 sm:h-28 sm:w-28 object-contain" />
        <img src="/images/home-1/brand-2.png" alt="Payment partner 2" className="h-24 w-24 sm:h-28 sm:w-28 object-contain" />
        <img src="/images/home-1/brand-3.png" alt="Payment partner 3" className="h-24 w-24 sm:h-28 sm:w-28 object-contain" />
      </div>
    </div>
  );
};

export default Brand;
