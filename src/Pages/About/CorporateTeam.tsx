import React, { useEffect, useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import PersonTile from "./components/PersonTile";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { mapStrapiPersonData } from "../../utils/strapiHelpers";
import { useLanguage } from "../../contexts/LanguageContext";

const CorporateTeam: React.FC = () => {
  const [corporateMembers, setCorporateMembers] = useState<any[]>([]);
  const [monitoringMembers, setMonitoringMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch corporate team members
        const corporateData = await aboutService.getCorporateTeam();
        setCorporateMembers(
          corporateData.map((d: any) => {
            const mapped = mapStrapiPersonData(d);
            return {
              ...mapped,
              image: getStrapiMediaUrl(mapped.image),
            };
          })
        );

        // Fetch monitoring and supervision unit members
        const monitoringData = await aboutService.getMonitoringSupervision();
        setMonitoringMembers(
          monitoringData.map((d: any) => {
            const mapped = mapStrapiPersonData(d);
            return {
              ...mapped,
              image: getStrapiMediaUrl(mapped.image),
            };
          })
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load corporate team");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]); // Add language dependency

  return (
    <div>
      <BreadCrumb title={t('submenu.corporate_team')} home="/" />
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container">
            {/* Section logo */}
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
              {t('submenu.corporate_team')}
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Our corporate team members and monitoring supervision units
            </p>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center mt-[60px]">
              <p className="text-lightGray">Loading corporate team...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center mt-[60px]">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Corporate Team Section */}
          {!loading && !error && corporateMembers.length > 0 && (
            <div className="mt-[60px] corporate-team-section">
              <h3 className="font-Garamond text-xl font-semibold mb-6 text-center text-lightBlack dark:text-white">
                Corporate Leadership
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                {corporateMembers
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((member) => (
                    <PersonTile 
                      key={member.id} 
                      id={member.id} 
                      name={member.name} 
                      position={member.position} 
                      email={member.email} 
                      phone={member.phone} 
                      image={member.image} 
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Monitoring and Supervision Unit Section */}
          {!loading && !error && monitoringMembers.length > 0 && (
            <div className="mt-16 monitoring-supervision-section">
              <div className="text-center mb-8">
                <h3 className="font-Garamond text-xl font-semibold mb-4 text-lightBlack dark:text-white">
                  Monitoring and Supervision Unit
                </h3>
                <p className="text-lightGray max-w-2xl mx-auto">
                  Dedicated unit responsible for monitoring operations and ensuring compliance with regulatory standards
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                {monitoringMembers
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((member) => (
                    <PersonTile 
                      key={member.id} 
                      id={member.id} 
                      name={member.name} 
                      position={member.position} 
                      email={member.email} 
                      phone={member.phone} 
                      image={member.image} 
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && corporateMembers.length === 0 && monitoringMembers.length === 0 && (
            <div className="text-center py-12 mt-[60px]">
              <p className="text-lightGray">No corporate team members found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateTeam;
