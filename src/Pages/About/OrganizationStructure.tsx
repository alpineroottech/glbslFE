import React, { useState, useEffect } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { aboutService, getStrapiMediaUrl } from "../../services/strapi";
import { renderStrapiBlocks } from "../../utils/strapiHelpers";
import { useLanguage } from "../../contexts/LanguageContext";

const OrgNode: React.FC<{ node: any; level?: number }> = ({ node, level = 0 }) => {
  const [open, setOpen] = useState(level < 1);
  return (
    <div className={`pl-${level * 4} mb-4`}>
      <div className="p-4 bg-white dark:bg-normalBlack shadow rounded hover:shadow-xl hover:scale-105 transition-all duration-300 border border-lightGray dark:border-gray">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-Garamond font-semibold">{node.title}</div>
            {node.name && <div className="text-sm text-gray-600">{node.name}</div>}
          </div>
          {node.children && (
            <button onClick={() => setOpen(!open)} className="btn-link">
              {open ? "-" : "+"}
            </button>
          )}
        </div>
      </div>
      {open && node.children && (
        <div className="mt-4">
          {node.children.map((c: any, i: number) => (
            <OrgNode key={i} node={c} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrganizationStructure: React.FC = () => {
  const [structure, setStructure] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await aboutService.getOrganizationStructure();
        setStructure(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load organization structure");
        // Fallback to static data if Strapi fails
        import("./data/organizational_structure.json").then((fallbackData) => {
          setStructure({ fallback: true, ...fallbackData.default });
        }).catch(() => {
          // If both fail, create a simple structure
          setStructure({
            title: "Organization Structure",
            fallback: true,
            children: []
          });
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [language]); // Add language dependency

  return (
    <div>
      <BreadCrumb title={t('submenu.organization_structure')} home="/" />
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container mb-16">
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
              {t('submenu.organization_structure')}
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              {loading ? 'Loading...' : error ? error : (
                structure?.description ? renderStrapiBlocks(structure.description) : 
                'Our organizational hierarchy and reporting structure'
              )}
            </p>
          </div>

          {loading && <p className="text-center">Loading organization structure...</p>}
          {error && !structure && <p className="text-center text-red-500">{error}</p>}
          {structure && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                {structure.fallback ? (
                  <OrgNode node={structure} />
                ) : (
                  <div className="bg-white dark:bg-normalBlack p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-Garamond font-semibold mb-4 text-lightBlack dark:text-white">
                      {structure.title || "Organization Structure"}
                    </h2>
                    {structure.description && (
                      <div className="text-lightGray mb-4">
                        {renderStrapiBlocks(structure.description)}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {structure.structureImage && (
                <div className="flex justify-center">
                  <img 
                    src={getStrapiMediaUrl(structure.structureImage.url)} 
                    alt="Organization Structure" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationStructure;
