import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const AnnualReportPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="annual"
      breadcrumbTitle={t('submenu.annual_report')}
      pageTitle="Annual Reports & Achievements"
      pageSubtitle="Comprehensive annual reports showcasing our institutional growth and community impact"
    />
  );
};

export default AnnualReportPage;
