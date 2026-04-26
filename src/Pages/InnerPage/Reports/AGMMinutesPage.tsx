import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const AGMMinutesPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="agm"
      breadcrumbTitle={t('submenu.agm_minutes')}
      pageTitle="AGM Minutes"
      pageSubtitle="Official minutes from our Annual General Meetings"
    />
  );
};

export default AGMMinutesPage;
