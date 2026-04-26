import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../BreadCrumb/BreadCrumb";
import LoanTable from "./components/LoanTable";
import { servicesService } from "../../../../services/strapi";
import { useLanguage } from "../../../../contexts/LanguageContext";

interface LoanProductItem {
  _id: string;
  name: string;
  volume: string;
  rate: string;
  serviceCharge: string;
  term: string;
  order: number;
}

// LoanServicesPage component for displaying loan products
// Follows website theme and design patterns
// Compatible with Strapi CMS for future data integration
const LoanServicesPage: React.FC = () => {
  const [loanProducts, setLoanProducts] = useState<LoanProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await servicesService.getLoanProducts();
        if (data && data.length > 0) {
          setLoanProducts(data);
        } else {
          // Fallback to static data if no data is available
          const fallbackData = await import('./data/fallback_loan_products.json');
          setLoanProducts(fallbackData.default);
          console.warn('Using fallback loan products data due to empty API response');
        }
      } catch (err) {
        console.error('API Error:', err);
        // Fallback to static data if API fails
        try {
          const fallbackData = await import('./data/fallback_loan_products.json');
          setLoanProducts(fallbackData.default);
          setError('Using offline data - some information may be outdated');
        } catch (fallbackErr) {
          setError('Failed to load loan products');
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]); // Add language dependency

  return (
    <section className="">
      {/* Breadcrumb navigation */}
      <BreadCrumb title={t('submenu.loan_services')} />

      {/* Loan services page content */}
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
                COMPREHENSIVE LOAN PRODUCTS
              </h1>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal max-w-3xl mx-auto">
                Discover our wide range of loan products designed to meet your diverse financial needs. 
                From personal loans to business financing, we offer competitive rates and flexible terms 
                to help you achieve your financial goals.
              </p>
            </div>
          </div>

          {/* Loan products table */}
          <div 
            className="px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {loading && <p>Loading loan products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <LoanTable 
                loanProducts={loanProducts.map((lp, idx) => ({
                  id: String(lp.id),
                  serialNumber: idx + 1,
                  loanProductName: lp.name,
                  loanVolume: lp.volume,
                  interestRate: lp.rate,
                  serviceCharge: lp.serviceCharge,
                  loanTerm: lp.term,
                }))}
                className="shadow-lg"
              />
            )}
          </div>

          {/* Additional information section */}
          <div 
            className="mt-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Quick application info */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    Quick Application
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    Simple and fast loan application process with minimal documentation required.
                  </p>
                </div>

                {/* Competitive rates info */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    Competitive Rates
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    We offer some of the most competitive interest rates in the market.
                  </p>
                </div>

                {/* Flexible terms info */}
                <div className="text-center">
                  <div className="bg-khaki text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                    Flexible Terms
                  </h3>
                  <p className="text-sm text-gray dark:text-lightGray font-Lora">
                    Choose repayment terms that suit your financial situation and capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div 
            className="mt-12 text-center px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
              Ready to Apply for a Loan?
            </h3>
            <p className="text-sm text-gray dark:text-lightGray font-Lora mb-6">
              Contact us today to discuss your loan requirements and get personalized assistance.
            </p>
            <div className="mt-5 md:mt-0">
              <a href="/contact">
                <button className="btn-items">Contact Us</button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default LoanServicesPage;
