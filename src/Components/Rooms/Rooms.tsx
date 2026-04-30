import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const ProductsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded] = useState(false);
  const { t } = useLanguage();

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
      // setLoaded(true);
    },
  });

  return (
    <div className="bg-whiteSmoke dark:bg-lightBlack">
      <div className="relative z-[1]">
        <div
          className="Container-Hero bg-lightBlack dark:bg-normalBlack flex flex-col sm:flex-row items-center justify-between font-Lora py-4 lg:py-5 px-5 sm:px-8 border-t-[3px] border-t-khaki mt-[-75px] left-0 right-0 z-[1] gap-4"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="text-center sm:text-left">
            <p className="text-white font-Garamond font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
              GURANS LAGHUBITTA BITTIYA SANSTHA LIMITED
            </p>
            <p className="text-lightGray font-bold mt-1 text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
              गरिबको मित्र गुराँस लघुवीत्त
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to="/about">
              <button className="w-[130px] sm:w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki font-Garamond border border-khaki text-white relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">
                {t('common.learn_more')}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Products & Services section heading */}
      <div className="py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
        <div className="Container">
          {/* section heading */}
          <div
            className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-[20px]">
              <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b]" />
              <img
                src="/images/home-1/gurans.png"
                alt="Gurans Laghubitta logo"
                className="h-8 w-auto object-contain"
              />
              <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b]" />
            </div>

            <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mb-[6] font-Garamond font-semibold uppercase">
              {t('products.section_label')}
            </h1>
            <p className="font-Lora leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base mt-[15px] lg:mt-0">
              {t('products.section_desc')}
            </p>
          </div>

          {/* Products & Services Slider */}
          <div className="relative">
            <div className="mt-14 2xl:mt-[60px] keen-slider" ref={sliderRef}>
              {/* slide - 1: Loan */}
              <div className="keen-slider__slide number-slide1">
                <div data-aos="fade-up-left" data-aos-duration="1000">
                  <div className="overflow-x-hidden 3xl:w-[410px] group relative">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <img
                          src="/images/home-1/loan_image.jpg"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                          alt="Loan Services"
                        />
                      </div>
                      <div>
                        <Link to="/services/loan">
                          <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                            {t('products.view_details')}
                            <BsArrowRight className="w-4 h-4 ml-2 text-white" />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-Garamond">
                      <div className="border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                        <div className="py-6 px-[30px]">
                          <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                            {t('products.loan_category')}
                          </h4>
                          <Link to="/services/loan">
                            <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                              {t('products.loan_title')}
                            </h2>
                          </Link>
                          <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                            {t('products.loan_desc')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* slide - 2: Savings */}
              <div className="keen-slider__slide number-slide1">
                <div data-aos="fade-up" data-aos-duration="1000">
                  <div className="3xl:w-[410px] group relative">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <img
                          src="/images/home-1/savings_image.jpg"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                          alt="Savings Accounts"
                        />
                      </div>
                      <div>
                        <Link to="/services/savings">
                          <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                            {t('products.view_details')}
                            <BsArrowRight className="w-4 h-4 ml-2 text-white" />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-Garamond">
                      <div className="border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                        <div className="py-6 px-[30px]">
                          <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                            {t('products.savings_category')}
                          </h4>
                          <Link to="/services/savings">
                            <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                              {t('products.savings_title')}
                            </h2>
                          </Link>
                          <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                            {t('products.savings_desc')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* slide - 3: Remittance */}
              <div className="keen-slider__slide number-slide1">
                <div data-aos="fade-up-right" data-aos-duration="1000">
                  <div className="3xl:w-[410px] group relative">
                    <div className="relative">
                      <div className="overflow-hidden">
                        <img
                          src="/images/home-1/remittance_image.jpg"
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                          alt="Remittance Services"
                        />
                      </div>
                      <div>
                        <Link to="/services/remittance">
                          <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                            {t('products.view_details')}
                            <BsArrowRight className="w-4 h-4 ml-2 text-white" />
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="font-Garamond">
                      <div className="border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                        <div className="py-6 px-[30px]">
                          <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                            {t('products.remittance_category')}
                          </h4>
                          <Link to="/services/remittance">
                            <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                              {t('products.remittance_title')}
                            </h2>
                          </Link>
                          <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora">
                            {t('products.remittance_desc')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* slider dots */}
            <div className="mx-auto">
              {loaded && instanceRef.current && (
                <div className="dots flex items-center justify-center">
                  {[
                    ...Array(
                      instanceRef.current.track.details.slides.length
                    ).keys(),
                  ].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                      className={"dot" + (currentSlide === idx ? " active" : "")}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
