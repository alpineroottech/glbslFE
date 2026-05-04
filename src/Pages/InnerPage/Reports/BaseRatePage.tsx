import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";
import { baseRateService } from "../../../services/strapi";
import ReportListPage from "../../../Components/Reports/ReportListPage";

// Nepali month order for correct fiscal-year sorting (Baisakh=1 … Chaitra=12)
const MONTH_ORDER: Record<string, number> = {
  Baisakh: 1,  Jestha: 2,   Ashadh: 3,  Shrawan: 4,
  Bhadra: 5,   Ashwin: 6,   Kartik: 7,  Mangsir: 8,
  Poush: 9,    Magh: 10,    Falgun: 11, Chaitra: 12,
};

interface BaseRateEntry {
  _id: string;
  nepaliYear: number;
  nepaliMonth: string;
  monthlyBaseRate: string;
}

const BaseRatePage: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<BaseRateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    baseRateService.getEntries().then((data) => {
      if (data && data.length > 0) {
        const sorted = [...data].sort((a, b) => {
          if (b.nepaliYear !== a.nepaliYear) return b.nepaliYear - a.nepaliYear;
          return (MONTH_ORDER[a.nepaliMonth] ?? 0) - (MONTH_ORDER[b.nepaliMonth] ?? 0);
        });
        setEntries(sorted);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Distinct years for the filter dropdown, newest first
  const years = useMemo(() => {
    const unique = Array.from(new Set(entries.map((e) => e.nepaliYear))).sort((a, b) => b - a);
    return unique.map(String);
  }, [entries]);

  const filtered = useMemo(() => {
    if (selectedYear === 'all') return entries;
    return entries.filter((e) => String(e.nepaliYear) === selectedYear);
  }, [entries, selectedYear]);

  return (
    <div>
      <BreadCrumb title={t('submenu.base_rate')} home="/" />

      <div className="dark:bg-normalBlack py-12 2xl:py-16">
        <div className="Container">

          {/* Page header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <hr className="w-[80px] h-[1px] bg-lightGray dark:bg-gray" />
              <img src="/images/home-1/gurans.png" alt="logo" className="h-7 w-auto object-contain" />
              <hr className="w-[80px] h-[1px] bg-lightGray dark:bg-gray" />
            </div>
            <h1 className="text-2xl md:text-3xl 2xl:text-[36px] font-Garamond font-semibold text-lightBlack dark:text-white uppercase">
              Base Rate Information
            </h1>
            <p className="font-Lora text-sm sm:text-base text-lightGray dark:text-lightGray mt-2">
              Monthly base rate data as per Nepal Rastra Bank guidelines
            </p>
          </div>

          {/* ── TABLE SECTION ── */}
          {loading ? (
            <p className="text-center text-lightGray py-10">Loading base rate data…</p>
          ) : entries.length === 0 ? (
            <p className="text-center text-lightGray py-10">
              No base rate entries yet. Admin can add them from Sanity Studio → Reports → Base Rate Entries.
            </p>
          ) : (
            <div className="mb-16">
              {/* Year filter */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm font-Lora text-lightGray dark:text-lightGray font-medium">
                  Filter by Year:
                </span>
                <button
                  onClick={() => setSelectedYear('all')}
                  className={`px-4 py-1.5 rounded text-sm font-Lora transition-colors ${
                    selectedYear === 'all'
                      ? 'bg-khaki text-white'
                      : 'bg-[#f5f5f5] dark:bg-[#2a2a2a] text-lightBlack dark:text-white hover:bg-khaki hover:text-white'
                  }`}
                >
                  All Years
                </button>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-4 py-1.5 rounded text-sm font-Lora transition-colors ${
                      selectedYear === y
                        ? 'bg-khaki text-white'
                        : 'bg-[#f5f5f5] dark:bg-[#2a2a2a] text-lightBlack dark:text-white hover:bg-khaki hover:text-white'
                    }`}
                  >
                    {y} BS
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full text-sm font-Lora border-collapse">
                  <thead>
                    <tr className="bg-[#c0392b] text-white">
                      <th className="px-5 py-4 text-left font-semibold border-r border-red-700 w-16">S.N.</th>
                      <th className="px-5 py-4 text-left font-semibold border-r border-red-700">Year (BS)</th>
                      <th className="px-5 py-4 text-left font-semibold border-r border-red-700">Month</th>
                      <th className="px-5 py-4 text-left font-semibold">Monthly Base Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((entry, idx) => (
                      <tr
                        key={entry._id}
                        className={`border-b border-[#e8e8e8] dark:border-[#333] transition-colors hover:bg-[#fdf6ec] dark:hover:bg-[#1e1e1e] ${
                          idx % 2 === 0 ? 'bg-white dark:bg-[#181818]' : 'bg-[#fafafa] dark:bg-[#1a1a1a]'
                        }`}
                      >
                        <td className="px-5 py-3 text-lightGray dark:text-lightGray">{idx + 1}</td>
                        <td className="px-5 py-3 text-lightBlack dark:text-white font-medium">{entry.nepaliYear}</td>
                        <td className="px-5 py-3 text-lightBlack dark:text-white">{entry.nepaliMonth}</td>
                        <td className="px-5 py-3 text-lightBlack dark:text-white font-semibold">{entry.monthlyBaseRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-lightGray dark:text-lightGray mt-3 font-Lora">
                Showing {filtered.length} of {entries.length} entries
                {selectedYear !== 'all' ? ` for ${selectedYear} BS` : ''}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── PDF REPORTS SECTION (reuses existing ReportListPage) ── */}
      <div className="dark:bg-normalBlack pb-16">
        <div className="Container">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-Garamond font-semibold text-lightBlack dark:text-white uppercase">
              Base Rate Report Documents
            </h2>
            <p className="font-Lora text-sm text-lightGray dark:text-lightGray mt-1">
              Downloadable base rate reports published by the institution
            </p>
          </div>
        </div>
        <ReportListPage
          reportType="base-rate"
          breadcrumbTitle=""
          pageTitle=""
          pageSubtitle=""
          hideBreadcrumb
          hideHeader
        />
      </div>
    </div>
  );
};

export default BaseRatePage;
