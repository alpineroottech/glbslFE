import React, { useEffect, useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import PersonTile from "./components/PersonTile";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { renderStrapiBlocks, mapStrapiPersonData } from "../../utils/strapiHelpers";
import { useLanguage } from "../../contexts/LanguageContext";

const Committee: React.FC = () => {
  const [committees, setCommittees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getCommittees();
        setCommittees(data);
      } catch (err) {
        console.error('Committee fetch error:', err);
        setError("Failed to load committees");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]); // Add language dependency

  return (
    <div>
      <BreadCrumb title={t('submenu.committee')} home="/" />
      {/* Expert Members */}
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
              {t('submenu.committee')}
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Our specialized committees ensuring governance and oversight
            </p>
          </div>

          {/* Section Content */}
          <div className="mt-[60px] space-y-12">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && committees.map((committee) => (
              <div key={committee._id}>
                <h3 className="font-Garamond text-2xl font-semibold mb-6 text-center text-lightBlack dark:text-white">
                  {committee.name}
                </h3>
                {committee.description && (
                  <p className="text-center text-lightGray mb-6 max-w-2xl mx-auto">
                    {renderStrapiBlocks(committee.description)}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                  {committee.members && committee.members.length > 0 ? (
                    committee.members.filter((member: any) => member.person !== null).length > 0 ? 
                      committee.members
                        .filter((member: any) => member.person !== null) // Filter out members with null person
                        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                        .map((member: any) => {
                          const person = member.person;
                          return (
                            <div key={`${committee._id}-${person._id}`}>
                              <PersonTile
                                id={person._id}
                                name={person.name}
                                position={member.committeePosition}
                                email={person.email || ""}
                                phone={person.phone || ""}
                                image={getStrapiMediaUrl(person.image)}
                              />
                              {member.roleDescription && (
                                <p className="text-sm text-lightGray mt-2 text-center px-4">
                                  {member.roleDescription}
                                </p>
                              )}
                            </div>
                          );
                        })
                      : <p className="text-center text-lightGray col-span-full">Committee member details are being updated. Please check back soon.</p>
                  ) : <p className="text-center text-lightGray col-span-full">No members assigned to this committee yet.</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committee;
