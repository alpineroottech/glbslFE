import React, { useEffect, useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { useLanguage } from "../../contexts/LanguageContext";

const AboutUs: React.FC = () => {
  const [content, setContent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getAboutUs();
        setContent(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load about us content");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]); // Add language dependency

  return (
    <div>
      <BreadCrumb title={t('submenu.about_us')} home="/" />
      {/* About Us Content */}
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          {/* Section header - centered */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img
                src="/images/home-1/gurans.png"
                alt="Gurans Laghubitta logo"
                className="h-8 w-auto object-contain"
              />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              {t('about.title')}
            </h1>
          </div>
          {/* Description - full width, left-aligned */}
          <div className="mb-16">
            <p className="font-Lora leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-normal text-base lg:text-lg max-w-3xl">
              {loading ? 'Loading...' : error ? error : (
                content?.aboutUsDescription?.[0]?.children?.[0]?.text ||
                'Discover our story, vision, and commitment to excellence in financial services'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              {/* Vision Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  {t('about.our_vision')}
                </h2>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora">
                  {content?.vision?.[0]?.children?.[0]?.text || 'To be the premier destination for luxury hospitality, setting new standards in comfort, service excellence, and memorable experiences.'}
                </p>
              </div>

              {/* Mission Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  {t('about.our_mission')}
                </h2>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora mb-4">
                  {content?.mission?.[0]?.children?.[0]?.text || 'We are committed to providing exceptional hospitality services through personalized attention, world-class amenities, and sustainable practices.'}
                </p>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora">
                  {content?.goal?.[0]?.children?.[0]?.text || 'Our dedicated team strives to exceed expectations while fostering meaningful connections and contributing positively to our local community.'}
                </p>
              </div>

              {/* Core Values */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  {t('about.our_core_values')}
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">{t('about.excellence')}</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Delivering superior quality in every aspect of our service
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">{t('about.integrity')}</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Maintaining the highest standards of honesty and transparency
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">{t('about.sustainability')}</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Protecting the environment and community for future generations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">{t('about.innovation')}</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Continuously evolving to better serve our members
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:order-last">
              <img 
                src={content?.aboutUsImage ? getStrapiMediaUrl(content.aboutUsImage) : '/images/inner/about-thumb.png'} 
                alt="About Us" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
