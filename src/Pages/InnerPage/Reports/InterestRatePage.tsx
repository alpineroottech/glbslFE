import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const InterestRatePage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="interest-rate"
      breadcrumbTitle={t('submenu.interest_rate')}
      pageTitle="Interest Rate"
      pageSubtitle="Published interest rate schedules and updates as per SEBON and NRB directives"
    />
  );
};

export default InterestRatePage;
