import React from "react";
import { BsCheck2 } from "react-icons/bs";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const ServiceDetails: React.FC = () => {
  const { t } = useLanguage();

  const loanTypes = [
    {
      name: "Group Loan",
      ne: "समूह ऋण",
      desc: "Collateral-free loans provided to self-help groups for productive income-generating activities.",
      ne_desc: "उत्पादनशील आय-आर्जनका क्रियाकलापहरूका लागि स्व-सहायता समूहलाई धितोविना ऋण।",
    },
    {
      name: "Micro-Enterprise Loan",
      ne: "साना उद्यम ऋण",
      desc: "Financing for small businesses and micro-enterprises to support growth and expansion.",
      ne_desc: "साना व्यवसाय र सूक्ष्म उद्यमहरूलाई वृद्धि र विस्तारको लागि वित्तपोषण।",
    },
    {
      name: "Agriculture Loan",
      ne: "कृषि ऋण",
      desc: "Affordable loans for farming activities, livestock, and agricultural equipment.",
      ne_desc: "कृषि क्रियाकलाप, पशुपालन र कृषि उपकरणका लागि किफायती ऋण।",
    },
    {
      name: "Education Loan",
      ne: "शैक्षिक ऋण",
      desc: "Support children's education with low-interest education loans for school and higher studies.",
      ne_desc: "विद्यालय र उच्च शिक्षाका लागि कम ब्याजदरमा शैक्षिक ऋणसहित बच्चाहरूको शिक्षालाई समर्थन।",
    },
  ];

  const eligibilityPoints = [
    "Must be a registered member of Gurans Laghubitta",
    "Minimum 3 months of active membership",
    "Must participate in a recognized group/centre",
    "Regular savings and good repayment history",
    "Valid citizenship and KYC documents",
  ];

  return (
    <section>
      <BreadCrumb title={t("page.service_details")} />

      {/* Overview */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: image */}
            <div data-aos="zoom-in-up" data-aos-duration="1000">
              <img
                src="/images/inner/service-details.jpg"
                alt="Gurans Laghubitta financial services"
                className="w-full rounded-md object-cover"
              />
            </div>

            {/* Right: service highlights */}
            <div className="space-y-6">
              <p className="text-base font-Lora text-khaki uppercase font-semibold">
                Financial Services
              </p>
              <h2 className="font-Garamond text-2xl md:text-3xl lg:text-4xl font-semibold text-lightBlack dark:text-white leading-snug">
                Accessible Microfinance for Every Member
              </h2>
              <p className="text-sm lg:text-base leading-7 text-gray dark:text-lightGray font-Lora">
                Gurans Laghubitta Bittiya Sanstha Ltd. provides a range of
                financial products designed to uplift communities across Nepal.
                Our services — from group loans to savings and remittance —
                are built on trust, transparency, and a commitment to financial
                inclusion.
              </p>

              {/* Office Hours */}
              <div className="bg-whiteSmoke dark:bg-normalBlack px-7 py-8 rounded-md">
                <h4 className="font-Garamond text-xl font-semibold text-lightBlack dark:text-white mb-5">
                  Branch Service Hours
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Sunday – Friday", hours: "9:00 AM – 5:00 PM" },
                    { label: "Saturday", hours: "9:00 AM – 1:00 PM" },
                    { label: "Public Holidays", hours: "Closed" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="bg-white dark:bg-lightBlack h-12 flex items-center justify-between px-5 rounded"
                    >
                      <p className="text-sm font-Lora font-medium text-lightBlack dark:text-white">
                        {row.label}
                      </p>
                      <p className="text-sm font-Lora font-semibold text-khaki">
                        {row.hours}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Products */}
          <div className="pt-16 lg:pt-[60px]">
            <p className="text-base font-Lora text-khaki uppercase font-semibold">
              Loan Products
            </p>
            <h2 className="py-3 font-Garamond text-2xl md:text-3xl lg:text-4xl font-semibold text-lightBlack dark:text-white">
              Types of Loans We Offer
            </h2>
            <p className="text-sm lg:text-base leading-7 text-gray dark:text-lightGray font-Lora max-w-2xl">
              All our loan products are designed to support productive
              activities, improve livelihoods, and build financial resilience
              among our members.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {loanTypes.map((loan) => (
                <div
                  key={loan.name}
                  className="bg-whiteSmoke dark:bg-normalBlack p-6 rounded-md border border-[#e8e8e8] dark:border-[#424242]"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <h3 className="font-Garamond text-xl font-semibold text-lightBlack dark:text-white mb-2">
                    {loan.name}
                    <span className="block text-base text-gray dark:text-lightGray font-normal font-Lora mt-1">
                      {loan.ne}
                    </span>
                  </h3>
                  <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-Lora">
                    {loan.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="py-16 lg:py-[60px]" data-aos="zoom-in-up" data-aos-duration="1000">
            <h2 className="pb-4 font-Garamond text-2xl md:text-3xl font-semibold text-lightBlack dark:text-white">
              Eligibility Criteria
            </h2>
            <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-Lora mb-6">
              To access our loan products, applicants must meet the following
              basic requirements:
            </p>
            <ul className="space-y-3">
              {eligibilityPoints.map((point, i) => (
                <li key={i} className="flex items-start">
                  <BsCheck2 size={18} className="text-khaki mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-Lora">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-lightBlack rounded-md px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-Garamond text-2xl lg:text-3xl font-semibold text-white mb-2">
                Ready to Apply?
              </h3>
              <p className="text-sm lg:text-base font-Lora text-lightGray">
                Visit your nearest Gurans Laghubitta branch or apply online.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link to="/online/apply-for-loan">
                <button className="px-7 py-3 bg-khaki text-white font-Garamond text-base font-semibold hover:bg-opacity-90 transition-all duration-300">
                  Apply Online
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-7 py-3 border border-white text-white font-Garamond text-base font-semibold hover:bg-white hover:text-lightBlack transition-all duration-300">
                  Contact Branch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
