import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const GovernanceReportPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="governance"
      breadcrumbTitle={t('submenu.governance_report')}
      pageTitle="Governance Reports"
      pageSubtitle="Corporate governance reports and compliance documents"
    />
  );
};

export default GovernanceReportPage;
