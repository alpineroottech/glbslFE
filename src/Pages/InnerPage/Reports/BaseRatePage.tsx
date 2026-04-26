import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const BaseRatePage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="base-rate"
      breadcrumbTitle={t('submenu.base_rate')}
      pageTitle="Base Rate Information"
      pageSubtitle="Current and historical base rate information as per Nepal Rastra Bank guidelines"
    />
  );
};

export default BaseRatePage;
