import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import PDFPreview from "./PDFPreview";

const Reports: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 320px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width:992px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
    loop: false,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="bg-whiteSmoke dark:bg-lightBlack">
      <div className="relative z-[1] ">
        <div
          className="Container-Hero bg-lightBlack dark:bg-normalBlack  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 items-center justify-center font-Lora py-3 lg:py-4 xl:py-5 2xl:py-6 border-t-[3px] border-t-khaki mt-[-75px]  left-0 right-0 z-[1]"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="col-span-6 md:col-span-5 lg:col-span-5 flex items-center justify-center px-6 gap-6">
            <div className="text-center">
              <p className="text-white font-Garamond font-bold" style={{ fontSize: "150%" }}>
                GURANS LAGHUBITTA BITTIYA SANSTHA LIMITED
              </p>
              <p className="text-lightGray font-bold mt-1" style={{ fontSize: "150%" }}>
                गुराँस लघुवीत्त वित्तीय संस्था लिमिटेड
              </p>
              <p className="text-lightGray font-normal text-sm mt-1">
                गरिबको मित्र गुराँस लघुवीत्त
              </p>
            </div>
            <div>
              <Link to="/about">
                <button style={{ marginLeft: '100px' }} className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki font-Garamond border border-khaki text-white mx-auto relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">
                  Learn more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Reports section heading */}
      <div className=" py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
        <div className="Container ">
          {/* section heading */}
          <div
            className=" text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px]  mx-auto  px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-[20px]">
              <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b] " />
              <img
                src="/images/home-1/gurans.png"
                alt="Gurans Laghubitta logo"
                className="h-8 w-auto object-contain"
              />
              <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b] " />
            </div>
            <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mb-[6]  font-Garamond font-semibold uppercase">
              REPORTS AND DOCUMENTS
            </h1>
            <p className="font-Lora leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base mt-[15px] lg:mt-0">
              Access our comprehensive collection of financial reports, regulatory documents, and institutional publications
            </p>
          </div>
          {/* Reports Slider Container */}

          <div className="relative">
            <div className="mt-14 2xl:mt-[60px] keen-slider " ref={sliderRef}>
              {/* slide - 1 */}
              <div className="keen-slider__slide number-slide1 ">
                <div data-aos="fade-up-left" data-aos-duration="1000">
                  <div className="overflow-x-hidden 3xl:w-[410px] group relative">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <PDFPreview title="Quarterly Report" description="Financial performance Q1 2024" />
                      </div>
                      <div className="">
                        <Link to={"/reports/quarterly-report"}>
                          <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white  group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                            View Report{" "}
                            <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-Garamond">
                      <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                        <div className="py-6 px-[30px]">
                          <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                            Financial Report
                          </h4>
                          <Link to="/reports/quarterly-report">
                            <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                              Quarterly Report
                            </h2>
                          </Link>
                          <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                            Quarterly financial performance and business highlights for stakeholders.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* slide - 2 */}
              <div className="keen-slider__slide number-slide1 ">
                <div data-aos="fade-up" data-aos-duration="1000">
                  <div className=" 3xl:w-[410px] group relative">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <PDFPreview title="Annual Report" description="Comprehensive yearly report" />
                      </div>
                      <div className="">
                        <Link to={"/reports/annual-report"}>
                          <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white  group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                            View Report{" "}
                            <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-Garamond">
                      <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                        <div className="py-6 px-[30px]">
                          <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                            Annual Report
                          </h4>
                          <Link to="/reports/annual-report">
                            <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                              Annual Report
                            </h2>
                          </Link>
                          <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                            Comprehensive annual financial report and institutional achievements overview.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* slide - 3 */}
              <div className="keen-slider__slide number-slide1 ">
                <div data-aos="fade-up-right" data-aos-duration="1000">
                  <div className=" 3xl:w-[410px] group relative">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <PDFPreview title="AGM Minutes" description="Meeting documentation" />
                      </div>
                      <div className="">
                        <Link to={"/reports/agm-minutes"}>
                          <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white  group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                            View Document{" "}
                            <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-Garamond">
                      <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                        <div className="py-6 px-[30px]">
                          <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                            AGM Documents
                          </h4>
                          <Link to="/reports/agm-minutes">
                            <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                              AGM Minutes
                            </h2>
                          </Link>
                          <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                            Annual General Meeting minutes and resolutions for transparency and governance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* slider breakpoints */}
            <div className="mx-auto ">
              {loaded && instanceRef.current && (
                <div className="dots flex items-center justify-center">
                  {[
                    ...Array(
                      instanceRef.current.track.details.slides.length
                    ).keys(),
                  ].map((idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          instanceRef.current?.moveToIdx(idx);
                        }}
                        className={
                          "dot" + (currentSlide === idx ? " active" : "")
                        }
                      ></button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
