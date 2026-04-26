import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../BreadCrumb/BreadCrumb";
import { servicesService } from "../../../../services/strapi";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { getStrapiMediaUrl } from "../../../../services/strapi";

// RemittanceServicesPage component for displaying remittance service information
// Follows website theme and design patterns
// Compatible with Strapi CMS for future content integration
const RemittanceServicesPage: React.FC = () => {
  const [content, setContent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await servicesService.getRemittanceService();
        if (data) {
          setContent(data);
        } else {
          // Fallback to static data if no data is available
          const fallbackData = await import('./data/fallback_remittance_service.json');
          setContent(fallbackData.default);
          console.warn('Using fallback remittance service data due to empty API response');
        }
      } catch (err) {
        console.error('API Error:', err);
        // Fallback to static data if API fails
        try {
          const fallbackData = await import('./data/fallback_remittance_service.json');
          setContent(fallbackData.default);
          setError('Using offline data - some information may be outdated');
        } catch (fallbackErr) {
          setError('Failed to load remittance service information');
        }
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [language]); // Add language dependency

  return (
    <section className="">
      {/* Breadcrumb navigation */}
      <BreadCrumb title={t('submenu.remittance_services')} />

      {/* Remittance services page content */}
      <div className="dark:bg-mediumBlack">
        <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
          
          {/* Hero section */}
          <div
            className="text-center mb-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="font-Garamond">
              <h5 className="text-base text-khaki leading-[26px] font-medium mb-[14px]">
                FINANCIAL SERVICES
              </h5>
              <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold mb-6">
                RELIABLE REMITTANCE SERVICES
              </h1>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal max-w-3xl mx-auto">
                Send and receive money safely and conveniently with our comprehensive remittance services. 
                We provide fast, secure, and cost-effective solutions for both domestic and international 
                money transfers.
              </p>
            </div>
          </div>

          {/* Service description */}
          <div 
            className="mb-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-lightBlack dark:text-white mb-6 font-Garamond">
                  What is Remittance Service?
                </h2>
                <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[28px] font-normal mb-6">
                  Our remittance service allows you to send money quickly and securely to your loved ones, 
                  whether they are in your home country or abroad. We understand the importance of supporting 
                  your family and friends, and we make it as easy as possible to transfer funds when they need it most.
                </p>
                <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[28px] font-normal">
                  With competitive exchange rates, minimal fees, and a network of trusted partners, 
                  we ensure your money reaches its destination safely and on time.
                </p>
              </div>
              <div className="text-center">
                <img 
                  src="/images/home-1/facilities-thumb-3.jpg"
                  alt="Remittance Services"
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Key features */}
          <div 
            className="mb-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h2 className="text-2xl lg:text-3xl font-semibold text-lightBlack dark:text-white mb-8 text-center font-Garamond">
              Key Features & Benefits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Fast Processing */}
              {/* If features exist in Strapi, render them; otherwise fallback to static cards */}
              {content?.features?.length ? (
                content.features.map((f: any, idx: number) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                      {f.title}
                    </h3>
                    <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                      {f.description}
                    </p>
                  </div>
                ))
              ) : (
                // static fallback cards
                <>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">F</span>
                    </div>
                    <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                      Fast Processing
                    </h3>
                    <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                      Quick processing times ensure your money reaches its destination within hours, 
                      not days.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">C</span>
                    </div>
                    <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                      Competitive Exchange Rates
                    </h3>
                    <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                      Get the best value for your money with our competitive exchange rates and 
                      transparent pricing.
                    </p>
                  </div>
                </>
              )}

              {/* Competitive Rates */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">C</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                  Competitive Exchange Rates
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                  Get the best value for your money with our competitive exchange rates and 
                  transparent pricing.
                </p>
              </div>

              {/* Global Network */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">G</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                  Wide Network
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                  Extensive network of partner institutions ensures coverage across multiple 
                  countries and regions.
                </p>
              </div>

              {/* Secure Transfers */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">S</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                  Secure Transfers
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                  Advanced security measures protect your transactions and personal information 
                  at every step.
                </p>
              </div>

              {/* Easy Tracking */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">T</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                  Transaction Tracking
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                  Real-time tracking allows you to monitor your transfer status from 
                  start to finish.
                </p>
              </div>

              {/* Customer Support */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">H</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-3 font-Garamond">
                  24/7 Support
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                  Our dedicated customer support team is available around the clock to 
                  assist you with any questions.
                </p>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div 
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
                Ready to Send Money?
              </h2>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal mb-8 max-w-2xl mx-auto">
                Contact us today to learn more about our remittance services or to start your money transfer. 
                Our friendly staff will guide you through the process and help you choose the best option for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="mt-5 md:mt-0">
                  <a href="/contact">
                    <button className="btn-items">Contact Us</button>
                  </a>
                </div>
                <div className="mt-5 md:mt-0">
                  <a href="/branches">
                    <button className="btn-items">Find Branch</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default RemittanceServicesPage;
