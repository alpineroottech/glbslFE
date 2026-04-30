import React, { useEffect, useState } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import PersonTile from "./components/PersonTile";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { mapStrapiPersonData } from "../../utils/strapiHelpers";
import { groupByRoleHierarchy } from "../../utils/personHierarchy";
import { useLanguage } from "../../contexts/LanguageContext";

const BoardOfDirectors: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getBoardMembers();
        setMembers(
          data.map((d: any) => {
            const mapped = mapStrapiPersonData(d);
            return { ...mapped, image: getStrapiMediaUrl(mapped.image) };
          })
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load board members");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]);

  const groups = groupByRoleHierarchy(members);

  return (
    <div>
      <BreadCrumb title={t('submenu.board_directors')} home="/" />
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container">
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img src="/images/home-1/gurans.png" alt="Gurans Laghubitta logo" className="h-8 w-auto object-contain" />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              {t('submenu.board_directors')}
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Meet our distinguished board members who guide our organization
            </p>
          </div>

          <div className="mt-[60px] space-y-14">
            {loading && <p className="text-center text-lightGray">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && groups.length === 0 && (
              <p className="text-center text-lightGray">No board members found.</p>
            )}

            {!loading && !error && groups.map((group) => (
              <div key={group.label}>
                {groups.length > 1 && (
                  <div className="flex items-center gap-4 mb-8">
                    <hr className="flex-1 border-[#e8e8e8] dark:border-[#333]" />
                    <h3 className="text-base font-Garamond font-semibold text-khaki uppercase tracking-widest whitespace-nowrap">
                      {group.label}
                    </h3>
                    <hr className="flex-1 border-[#e8e8e8] dark:border-[#333]" />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                  {group.members.map((m) => (
                    <PersonTile key={m.id} id={m.id} name={m.name} position={m.position} email={m.email} phone={m.phone} image={m.image} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOfDirectors;
