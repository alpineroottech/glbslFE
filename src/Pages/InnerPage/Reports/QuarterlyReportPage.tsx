import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const QuarterlyReportPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="quarterly"
      breadcrumbTitle={t('submenu.quarterly_report')}
      pageTitle="Quarterly Reports"
      pageSubtitle="Quarterly financial reports covering key performance metrics and institutional updates"
    />
  );
};

export default QuarterlyReportPage;
