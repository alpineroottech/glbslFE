import React from "react";
import { IoIosCall } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import Brand from "../../Components/Brand/Brand";
import { BiEnvelope } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Brand />
      <footer className="">
        {/* footer content */}
        <div className="bg-lightBlack overflow-x-hidden">
          <div className="Container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 2xl:grid-cols-12 gap-5 lg:gap-3 xl:gap-5 2xl:gap-[30px] pt-14 lg:pt-[100px]">
            {/* Footer Content one. */}
            <div
              className="lg:mt-[-195px] lg:col-span-3 2xl:col-span-4 bg-[#385344]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="py-6 md:py-7 lg:py-[50px]  px-10 lg:px-5 xl:px-8 2xl:px-9">
                <img src="/images/home-1/logo-1.png" alt="Company logo" />
                <div className="py-8 2xl:py-[50px]">
                  <h1 className="text-lg sm:text-xl md:text-[22px] leading-[38px] font-medium text-white relative font-Garamond before:w-7 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-10">
                    {t("footer.contact_info")}
                  </h1>

                  <div className="space-y-4 pt-[30px] pb-2 2xl:pb-[30px]">
                    <a
                      href="tel:021-464453"
                      className="flex items-center text-lightGray font-Lora font-normal text-sm sm:text-base leading-[26px] mt-2 hover:text-white"
                    >
                      <IoIosCall className="text-khaki w-5 h-5 mr-3 2xl:mr-4" size={14} />
                      <span>021-464453
                        <br />
                        (Corporate Office)
                      </span>
                    </a>

                    <a
                      href="tel:18105000049"
                      className="flex items-center text-lightGray font-Lora font-normal text-sm sm:text-base leading-[26px] hover:text-white"
                    >
                      <IoIosCall className="text-khaki w-5 h-5 mr-3 2xl:mr-4" size={14} />
                      <span>Toll Free No. 18105000049 (NTC) <br /> पैसा नलाग्ने न‌ं. (नमस्ते)</span>
                    </a>

                    <a
                      href="mailto:info@glbsl.com.np"
                      className="flex items-center text-lightGray font-Lora font-normal text-sm sm:text-base leading-[26px] hover:text-white"
                    >
                      <BiEnvelope className="text-khaki w-5 h-5 mr-3 2xl:mr-4" size={14} />
                      <span>info@glbsl.com.np</span>
                    </a>

                    <a
                      href="https://maps.app.goo.gl/MhHVaeRkMNNVjpN19"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-lightGray font-Lora font-normal text-sm sm:text-base leading-[26px] hover:text-white"
                    >
                      <IoLocationSharp className="text-khaki w-5 h-5 mr-3 2xl:mr-4" size={14} />
                      <span>
                        Buddhiganga-1, PuspalalChowk <br /> Morang
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* footer content-2 */}
            <div
              className="pt-0 pb-8 overflow-x-hidden lg:col-span-2 2xl:col-span-2 ml-2"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className=" text-lg sm:text-xl md:text-[22px] leading-[38px] font-medium text-white relative font-Garamond before:w-7 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-10 uppercase ">
                UseFul Links
              </h1>
              <div className="pt-[30px] pb-0 lg:py-[30px]">
                <ul className="text-lightGray font-Lora font-normal text-sm sm:text-base leading-[26px] list-none hover:list-disc">
                  <li className="hover:ml-[17px] md:hover:ml-[18px] transition-all duration-500 hover:text-khaki leading-[44px]">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="hover:ml-[17px] md:hover:ml-[18px] transition-all duration-500 hover:text-khaki leading-[44px]">
                    <Link to="/services">Services</Link>
                  </li>
                  <li className="hover:ml-[17px] md:hover:ml-[18px] transition-all duration-500 hover:text-khaki leading-[44px]">
                    <Link to="/branches">Branches</Link>
                  </li>
                  <li className="hover:ml-[17px] md:hover:ml-[18px] transition-all duration-500 hover:text-khaki leading-[44px]">
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* footer content-3 */}
            <div
              className="pt-0 pb-8  lg:col-span-3 2xl:col-span-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="text-lg sm:text-xl md:text-[22px] leading-[38px] font-medium text-white relative font-Garamond before:w-7 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-10 uppercase ">
                GALLERY
              </h1>
              <div className="grid grid-cols-3 gap-2 mt-[45px] w-full content-center">
                <img src="/images/home-1/image1.jpg" alt="glbsl gallery image 1" className="w-full h-auto object-cover" />
                <img src="/images/home-1/image2.jpg" alt="glbsl gallery image 2" className="w-full h-auto object-cover" />
                <img src="/images/home-1/image3.jpg" alt="glbsl gallery image 3" className="w-full h-auto object-cover" />
                <img src="/images/home-1/image4.jpg" alt="glbsl gallery image 4" className="w-full h-auto object-cover" />
                <img src="/images/home-1/image5.jpg" alt="glbsl gallery image 5" className="w-full h-auto object-cover" />
                <img src="/images/home-1/image6.jpg" alt="glbsl gallery image 6" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* footer content-4 */}
            <div
              className="pt-0 pb-8 overflow-x-hidden lg:col-span-2 2xl:col-span-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="text-lg sm:text-xl md:text-[22px] leading-[38px] font-medium text-white relative font-Garamond before:w-7 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-10 uppercase ">
                LOCATE US:
              </h1>
              <div className="space-y-4 py-[44px]">
                {/* Map preview — full width, links to Google Maps */}
                <a
                  href="https://maps.app.goo.gl/MhHVaeRkMNNVjpN19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded border border-[#eee] overflow-hidden w-full hover:opacity-90 transition-opacity"
                >
                  <iframe
                    title="GLBSL Location"
                    src="https://www.google.com/maps?q=Dhankuta+Municipality+Dhankuta+Nepal&output=embed"
                    width="100%"
                    height="193"
                    style={{ border: 0, display: "block", pointerEvents: "none" }}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center py-5 2xl:py-7 bg-[#161616] text-sm md:text-base text-lightGray font-Lora font-normal">
            {` © All Rights Reserved. Gurans Laghubitta Bittiya Sanstha Limited. ${new Date().getFullYear()} `}
            <br />
            <a
              href="https://rootalpine.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs md:text-sm text-lightGray opacity-60 font-Lora font-normal hover:underline"
            >
              Crafted by Alpine Root Technologies Pvt. Ltd.
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
