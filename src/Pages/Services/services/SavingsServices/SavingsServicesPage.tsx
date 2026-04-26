import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../BreadCrumb/BreadCrumb";
import SavingsTable from "./components/SavingsTable";
import { servicesService } from "../../../../services/strapi";
import { useLanguage } from "../../../../contexts/LanguageContext";

interface SavingsItem {
  _id: string;
  name: string;
  interestRate: string;
  order: number;
}

// SavingsServicesPage component for displaying savings products
// Follows website theme and design patterns
// Compatible with Strapi CMS for future data integration
const SavingsServicesPage: React.FC = () => {
  
  const [items, setItems] = useState<SavingsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await servicesService.getSavingsProducts();
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // Fallback to static data if no data is available
          const fallbackData = await import('./data/fallback_savings_products.json');
          setItems(fallbackData.default);
          console.warn('Using fallback savings products data due to empty API response');
        }
      } catch (err) {
        console.error('API Error:', err);
        // Fallback to static data if API fails
        try {
          const fallbackData = await import('./data/fallback_savings_products.json');
          setItems(fallbackData.default);
          setError('Using offline data - some information may be outdated');
        } catch (fallbackErr) {
          setError('Failed to load savings products');
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
      <BreadCrumb title={t('submenu.savings_services')} />

      {/* Savings services page content */}
      <div className="dark:bg-mediumBlack">
        <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
          
          {/* Page header */}
          <div
            className="text-center mb-12 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="font-Garamond">
              <h5 className="text-base text-khaki leading-[26px] font-medium mb-[14px]">
                FINANCIAL SERVICES
              </h5>
              <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold mb-6">
                SECURE YOUR FINANCIAL FUTURE
              </h1>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal max-w-3xl mx-auto">
                Build your wealth with our diverse range of savings products. Enjoy attractive interest rates, 
                flexible terms, and the security of knowing your money is growing in a trusted financial institution.
              </p>
            </div>
          </div>

          {/* Savings products table */}
          <div 
            className="px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {loading && <p>Loading savings products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <SavingsTable 
                savingsProducts={items.map((it, idx) => ({
                  id: String(it.id),
                  serialNumber: idx + 1,
                  savingProductName: it.name,
                  interestRate: it.interestRate,
                }))}
                className="shadow-lg"
              />
            )}
          </div>

          {/* Benefits section */}
          <div 
            className="mt-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-lightBlack dark:text-white mb-8 text-center font-Garamond">
                Why Choose Our Savings Products?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* High Interest Rates */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">%</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    High Interest Rates
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    Competitive interest rates to maximize your savings growth.
                  </p>
                </div>

                {/* Safe & Secure */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">S</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    Safe & Secure
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    Your deposits are protected and insured for complete peace of mind.
                  </p>
                </div>

                {/* Flexible Terms */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">F</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    Flexible Terms
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    Choose from various term options that suit your financial goals.
                  </p>
                </div>

                {/* Easy Access */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">A</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    Easy Access
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    Convenient access to your funds through multiple channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div 
            className="mt-12 text-center px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
              Start Saving Today
            </h3>
            <p className="text-sm text-gray dark:text-lightGray font-Lora mb-6">
              Open a savings account with us and take the first step towards a secure financial future.
            </p>
            <div className="mt-5 md:mt-0">
              <a href="/contact">
                <button className="btn-items">Open Account</button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SavingsServicesPage;
