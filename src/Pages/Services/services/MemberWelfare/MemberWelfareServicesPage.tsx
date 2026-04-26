import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../BreadCrumb/BreadCrumb";
import WelfareServicesList from "./components/WelfareServicesList";
import { servicesService } from "../../../../services/strapi";
import { useLanguage } from "../../../../contexts/LanguageContext";

interface WelfareItem {
  id: number | string;
  attributes: {
    title: string;
    description: string;
    order?: number;
  };
}

// MemberWelfareServicesPage component for displaying member welfare services
// Follows website theme and design patterns
// Compatible with Strapi CMS for future data integration
const MemberWelfareServicesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<WelfareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await servicesService.getMemberWelfareService();
        if (data && data.welfareServices) {
          // data.welfareServices is expected to be an array of components
          setItems((data?.welfareServices || []).map((w: any, idx: number) => ({ id: idx, attributes: { title: w.title, description: w.description, order: w.order } })));
        } else {
          // Fallback to static data if no data is available
          const fallbackData = await import('./data/fallback_member_welfare_service.json');
          const welfareServices = fallbackData.default.welfareServices || [];
          setItems(welfareServices.map((w: any, idx: number) => ({ 
            id: idx, 
            attributes: { 
              title: w.title, 
              description: w.description, 
              order: w.order 
            } 
          })));
          console.warn('Using fallback member welfare service data due to empty API response');
        }
      } catch (err) {
        console.error('API Error:', err);
        // Fallback to static data if API fails
        try {
          const fallbackData = await import('./data/fallback_member_welfare_service.json');
          const welfareServices = fallbackData.default.welfareServices || [];
          setItems(welfareServices.map((w: any, idx: number) => ({ 
            id: idx, 
            attributes: { 
              title: w.title, 
              description: w.description, 
              order: w.order 
            } 
          })));
          setError('Using offline data - some information may be outdated');
        } catch (fallbackErr) {
          setError('Failed to load welfare services');
        }
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [language]);

  return (
    <section className="">
      {/* Breadcrumb navigation */}
      <BreadCrumb title={t('submenu.member_welfare')} />

      {/* Member welfare services page content */}
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
                SOCIAL SERVICES
              </h5>
              <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold mb-6">
                COMPREHENSIVE MEMBER WELFARE PROGRAMS
              </h1>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal max-w-3xl mx-auto">
                Beyond banking, we care for our members' overall well-being. Our welfare programs are designed 
                to support you and your family through various life events, skill development opportunities, 
                and health initiatives.
              </p>
            </div>
          </div>

          {/* Introduction section */}
          <div 
            className="mb-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-lightBlack dark:text-white mb-6 font-Garamond text-center">
                Our Commitment to Member Welfare
              </h2>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[28px] font-normal text-center max-w-4xl mx-auto">
                We believe in supporting our members beyond financial services. Our comprehensive welfare programs 
                are designed to enhance the quality of life for our members and their families. From skill development 
                to emergency support, we stand by our members through all phases of life.
              </p>
            </div>
          </div>

          {/* Welfare services list */}
          <div 
            className="mb-16 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h2 className="text-2xl lg:text-3xl font-semibold text-lightBlack dark:text-white mb-8 text-center font-Garamond">
              Our Welfare Services
            </h2>
            
            {loading && <p>Loading welfare services...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <WelfareServicesList 
                welfareServices={items.map((it) => ({ id: String(it.id), serviceName: it.attributes.title, description: it.attributes.description }))}
                className="max-w-4xl mx-auto"
              />
            )}
          </div>

          {/* Additional support info */}
          <div 
            className="mb-12 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Community Focus */}
              <div className="text-center">
                <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">C</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                  Community Focused
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora">
                  Our programs are designed to strengthen the entire community by empowering individual members.
                </p>
              </div>

              {/* Comprehensive Support */}
              <div className="text-center">
                <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">S</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                  Comprehensive Support
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora">
                  From training programs to emergency assistance, we provide holistic support for our members.
                </p>
              </div>

              {/* Long-term Impact */}
              <div className="text-center">
                <div className="bg-khaki text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">I</span>
                </div>
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                  Long-term Impact
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora">
                  Our welfare initiatives focus on creating lasting positive changes in members' lives.
                </p>
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div 
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
                Need Support or Information?
              </h2>
              <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal mb-8 max-w-2xl mx-auto">
                Our member welfare team is here to help you access the support you need. Contact us to learn more 
                about eligibility criteria and application processes for our welfare programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="mt-5 md:mt-0">
                  <a href="/contact">
                    <button className="btn-items">Contact Welfare Team</button>
                  </a>
                </div>
                <div className="mt-5 md:mt-0">
                  <a href="/branches">
                    <button className="btn-items">Visit Branch</button>
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

export default MemberWelfareServicesPage;
