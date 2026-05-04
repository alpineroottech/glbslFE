import React, { useState, useMemo, useEffect } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import BranchTile from "./components/BranchTile";
import { getBranches, BranchData } from "./data";
import { branchesService, getStrapiMediaUrl } from "../../services/strapi";
import { useLanguage } from "../../contexts/LanguageContext";

const BranchesPage: React.FC = () => {
  const { t } = useLanguage();
  const [branches, setBranches] = useState<BranchData[]>(getBranches());
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  useEffect(() => {
    branchesService.getBranches().then((data) => {
      if (data && data.length > 0) {
        const mapped: BranchData[] = data.map((b: any) => ({
          id: b._id,
          sn: b.sn ?? 0,
          name: b.name ?? '',
          district: b.district ?? '',
          municipality: b.municipality ?? '',
          ward: b.ward ?? 0,
          locality: b.locality ?? '',
          contactPerson: b.contactPerson ?? '',
          phone: b.phone ?? '',
          email: b.email ?? '',
          managerImage: b.managerImage ? getStrapiMediaUrl(b.managerImage) : undefined,
        }));
        setBranches(mapped);
      }
      // If CMS returns empty, keep the static fallback already set in useState
    }).catch(() => {
      // Network error — keep static fallback
    }).finally(() => setLoading(false));
  }, []);

  const allDistricts = useMemo(
    () => Array.from(new Set(branches.map((b) => b.district))).sort(),
    [branches],
  );

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        branch.name.toLowerCase().includes(q) ||
        branch.district.toLowerCase().includes(q) ||
        branch.locality.toLowerCase().includes(q) ||
        branch.contactPerson.toLowerCase().includes(q);

      const matchesDistrict =
        selectedDistrict === "all" || branch.district === selectedDistrict;

      return matchesSearch && matchesDistrict;
    });
  }, [branches, searchTerm, selectedDistrict]);

  return (
    <section className="min-h-screen">
      <BreadCrumb title={t('page.our_branches')} home="/" />

      <section className="dark:bg-normalBlack">
        <div className="Container py-20 2xl:py-[120px]">

          {/* Page header */}
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 mb-14">
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray" />
              <img src="/images/home-1/gurans.png" alt="Gurans Laghubitta logo" className="h-8 w-auto object-contain" />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              {t('page.our_branches')}
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Discover our network of {branches.length} branches serving communities across Nepal.
              Each branch is staffed by dedicated professionals committed to your financial well-being.
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by branch name, district or locality..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-[#e0ddd8] dark:border-[#444] rounded bg-white dark:bg-lightBlack text-lightBlack dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-khaki font-Lora text-sm"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-3 border border-[#e0ddd8] dark:border-[#444] rounded bg-white dark:bg-lightBlack text-lightBlack dark:text-white focus:outline-none focus:ring-1 focus:ring-khaki font-Lora text-sm"
              >
                <option value="all">All Districts</option>
                {allDistricts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray dark:text-lightGray mt-2 font-Lora text-center">
              Showing {filteredBranches.length} of {branches.length} branches
            </p>
          </div>

          {/* Branches grid */}
          {filteredBranches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBranches.map((branch) => (
                <BranchTile key={branch.id} branch={branch} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lightGray dark:text-gray font-Lora">No branches found matching your search.</p>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-16 bg-[#f8f6f3] dark:bg-lightBlack rounded-sm p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
              Need More Help?
            </h3>
            <p className="text-sm text-gray dark:text-lightGray font-Lora mb-5">
              Contact our head office at Budiganga-1, Puspalal Chowk, Morang or reach us through any of our branch offices.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-khaki text-white text-sm font-medium font-Garamond hover:bg-lightBlack transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BranchesPage;
