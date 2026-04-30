import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const FinancialIndicatorPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="financial-indicator"
      breadcrumbTitle={t('submenu.financial_indicator')}
      pageTitle="Financial Indicators"
      pageSubtitle="Key financial indicators and performance metrics published as per regulatory requirements"
    />
  );
};

export default FinancialIndicatorPage;
