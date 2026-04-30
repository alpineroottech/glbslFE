import React from "react";
import { BsPlay } from "react-icons/bs";
import { useState } from "react";
import FsLightbox from "fslightbox-react";
const Action: React.FC = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <div className="dark:bg-mediumBlack dark:z-[-1]">
      <section className="Container mt-0 lg:mt-[-90px] dark:z-[1]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <div
            className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h5 className="text-[32px] text-khaki leading-[26px] font-semibold">
              MESSAGE FROM THE CEO
            </h5>
            <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
              Serving marginalized communities with microcredit, savings, and financial literacy
            </h1>
            <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
              The microfinance sector in Nepal provides crucial financial access in remote, underserved areas. GLBSL, a province-level institution supported by 24 promoters, serves marginalized communities in Province-1 with microcredit, savings, microinsurance, remittances, and financial literacy programs. It is expanding outreach, emphasizes client protection, and continually refines products and delivery to better meet clients' needs.
            </p>
            {/* <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline  text-gray dark:text-lightGray font-normal ">
              “Future link to the YouTube Video ”
            </p> */}
            <div className="flex items-center space-x-6 pt-5">
              <img
                src="/images/home-1/call-do-action-img.png"
                className="w-[65px] h-[65px] object-cover"
                alt=""
              />

              <div className="">
                <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                  Bishnu Prasad Upadhayay
                </h4>
                <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
                  <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                  CEO, Gurans Laghubitta Bittiya Sanstha Ltd.
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex-1 w-full relative min-h-[250px] sm:min-h-[300px] lg:min-h-0"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src="/images/home-1/action-img.png"
              className="w-full h-full object-cover"
              alt=""
            />

            <div
              className="w-[70px] h-[70px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1]"
              onClick={() => setToggler(!toggler)}
            >
              <BsPlay className="w-8 h-8" />
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border w-[90px] h-[90px] rounded-full border-white video-animation"></span>
          </div>
          <FsLightbox
            toggler={toggler}
            sources={["https://youtu.be/fFDyoI73viQ?si=GbDzAagjoa_0Nv2x"]}
          />
        </div>
      </section>
    </div>
  );
};

export default Action;
