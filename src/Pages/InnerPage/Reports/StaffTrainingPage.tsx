import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import ReportListPage from "../../../Components/Reports/ReportListPage";

const StaffTrainingPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <ReportListPage
      reportType="staff-training"
      breadcrumbTitle={t('submenu.staff_training')}
      pageTitle="Staff Training Reports"
      pageSubtitle="Reports on capacity building and staff development programs"
    />
  );
};

export default StaffTrainingPage;
