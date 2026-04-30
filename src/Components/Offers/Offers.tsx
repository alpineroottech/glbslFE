import React, { useEffect, useState } from "react";
import PersonTile from "../../Pages/About/components/PersonTile";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { mapStrapiPersonData } from "../../utils/strapiHelpers";
import { useLanguage } from "../../contexts/LanguageContext";

const Offers: React.FC = () => {
  const [officers, setOfficers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [informationOfficer, complianceOfficer, complaintOfficer] = await Promise.all([
          aboutService.getInformationOfficer().catch(err => {
            console.error('Error fetching information officer:', err);
            return null;
          }),
          aboutService.getComplianceOfficer().catch(err => {
            console.error('Error fetching compliance officer:', err);
            return null;
          }),
          aboutService.getComplaintOfficer().catch(err => {
            console.error('Error fetching complaint officer:', err);
            return null;
          }),
        ]);

        const officersList = [informationOfficer, complianceOfficer, complaintOfficer]
          .filter(officer => officer !== null)
          .map((officer: any) => {
            const mapped = mapStrapiPersonData(officer);
            return {
              ...mapped,
              image: getStrapiMediaUrl(mapped.image),
            };
          });

        setOfficers(officersList);
      } catch (err) {
        console.error("Error fetching officers:", err);
        setError("Failed to load contact officers");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, [language]);

  return (
    <section className="bg-[#f8f6f3] dark:bg-lightBlack">
      <div className="Container py-20 lg:py-[120px]">
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
            {t('offers.subtitle')}
          </h1>
          <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
            {t('offers.description')}
          </p>
        </div>

        {/* Section Content */}
        <div className="mt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
          {loading && (
            <div className="col-span-full text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki mx-auto"></div>
              <p className="mt-4 text-gray dark:text-lightGray">{t('offers.loading')}</p>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          )}
          {!loading && !error && officers.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray dark:text-lightGray">
                {t('offers.no_officers')}
              </p>
              <p className="text-sm text-gray dark:text-lightGray mt-2">
                {t('offers.add_in_cms')}
              </p>
            </div>
          )}
          {!loading && !error && officers.map((m) => (
            <PersonTile key={m.id} id={m.id} name={m.name} position={m.position} email={m.email} phone={m.phone} image={m.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
