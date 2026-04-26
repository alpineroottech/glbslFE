import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import PDFViewer from "../../../Components/Reports/PDFViewer";
import { useLanguage } from "../../../contexts/LanguageContext";
import { reportsService, googleDriveHelpers } from "../../../services/strapi";

// TypeScript interface for Report from Sanity CMS with Hybrid Upload Support
interface StrapiReport {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  reportType?: string;
  publishDate?: string;
  fiscalYear?: string;
  // HYBRID UPLOAD FIELDS
  fileSource?: "Upload" | "Google_Drive";
  uploadedFile?: {
    asset?: {
      url?: string;
    };
  };
  // GOOGLE DRIVE FIELDS
  fileId?: string;
  fileName?: string;
}

const AGMMinutesPage: React.FC = () => {
  const [reports, setReports] = useState<StrapiReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<StrapiReport | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchAGMReports = async () => {
      try {
        setLoading(true);
        const response = await reportsService.getReportsByType('agm');
        setReports(response.data || []);
      } catch (err) {
        setError('Failed to load AGM minutes');
        console.error('Error fetching AGM reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAGMReports();
  }, [language]);

  // HELPER: Get file URL based on source (Google Drive or Direct Upload)
  const getReportFileUrl = (report: StrapiReport): string | null => {
    if (report.fileSource === 'Google_Drive' && report.fileId) {
      return `https://drive.google.com/file/d/${report.fileId}/view`;
    } else if (report.fileSource === 'Upload' && report.uploadedFile?.asset?.url) {
      return report.uploadedFile.asset.url;
    }
    return null;
  };

  // HELPER: Determine download URL based on fileSource
  const getReportDownloadUrl = (report: StrapiReport): string | null => {
    if (report.fileSource === "Upload" && report.uploadedFile?.asset?.url) {
      return report.uploadedFile.asset.url;
    } else if (report.fileSource === "Google_Drive" && report.fileId) {
      return googleDriveHelpers.getDownloadUrl(report.fileId);
    }
    return null;
  };

  // HELPER: Get file name for download
  const getReportFileName = (report: StrapiReport): string => {
    if (report.fileName) {
      return report.fileName;
    }
    return `${report.title}.pdf`;
  };

  // HELPER: Get file size display
  const getFileSize = (_report: StrapiReport): string => {
    return "N/A";
  };

  const handleDownload = async (report: StrapiReport) => {
    try {
      const downloadUrl = getReportDownloadUrl(report);
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
        alert(`Downloading ${getReportFileName(report)}`);
      } else {
        alert('No report file available for download.');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download the report. Please try again.');
    }
  };

  const handleView = (report: StrapiReport) => {
    setSelectedReport(report);
    setViewerOpen(true);
  };

  const handleShare = async (report: StrapiReport) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${report.title} - GLBSL`,
          text: `Check out our ${report.title}`,
          url: `${window.location.origin}/reports/agm/${report.slug}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        alert(`${report.title} link copied to clipboard!`);
      }
    } else {
      alert(`${report.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      <BreadCrumb title="AGM MINUTES" home={"/"} />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container">
          {/* Section heading */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white font-Garamond font-semibold capitalize">
                Annual General Meeting Minutes
              </h1>
              <div className="flex items-center justify-center text-center mx-auto mt-2 lg:mt-[6px]">
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] mr-5 "></div>
                <img
                  src="/images/home-1/section-shape1.png"
                  className="w-[30px] h-[30px]"
                  alt=""
                />
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] ml-5"></div>
              </div>
              <p className="text-center text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-Lora font-normal mt-[10px]">
                Official minutes and resolutions from Annual General Meetings
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki mx-auto"></div>
                <p className="mt-4 text-gray dark:text-lightGray">Loading AGM minutes...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-6 py-2 bg-khaki text-white rounded hover:bg-opacity-90 transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* No Reports State */}
          {!loading && !error && reports.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-gray dark:text-lightGray">No AGM minutes available at the moment.</p>
              </div>
            </div>
          )}

          {/* Reports Grid */}
          {!loading && !error && reports.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-16 2xl:pt-20">
              {reports.map((report, index) => (
                <div
                  key={report._id}
                  className="overflow-x-hidden 3xl:w-[410px] group"
                  data-aos="fade-up"
                  data-aos-duration={800 + (index * 200)}
                >
                  <div className="relative">
                    <div className="overflow-hidden">
                      <PDFPreview title={report.title} description={report.description || ''} />
                    </div>

                    <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                      <button
                        onClick={() => handleView(report)}
                        className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                        title="View PDF"
                      >
                        <BsEye className="w-3 h-3 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(report)}
                        className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                        title="Download PDF"
                      >
                        <BsDownload className="w-3 h-3 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => handleShare(report)}
                        className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                        title="Share Report"
                      >
                        <BsShare className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="font-Garamond">
                    <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                      <div className="py-6 px-[30px]">
                        <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                          {report.publishDate || report.fiscalYear || 'Date not available'}
                        </h4>
                        <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                          {report.title}
                        </h2>
                        <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                          {report.description || 'No description available'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {report.fileSource === "Upload" ? `File Size: ${getFileSize(report)}` : 'Google Drive File'}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(report)}
                              className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                            >
                              Quick View
                            </button>
                            <span className="text-xs text-gray-300">|</span>
                            <button
                              onClick={() => handleDownload(report)}
                              className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to Reports Navigation */}
          <div className="flex justify-center mt-16">
            <Link
              to="/reports"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              <HiArrowLongLeft className="w-5 h-5 mr-2" />
              Back to All Reports
            </Link>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedReport && (
        <PDFViewer
          isOpen={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setSelectedReport(null);
          }}
          fileUrl={selectedReport.fileSource === 'Google_Drive' 
            ? selectedReport.fileId || '' 
            : getReportFileUrl(selectedReport) || ''}
          fileName={getReportFileName(selectedReport)}
          fileSource={selectedReport.fileSource}
        />
      )}
    </section>
  );
};

export default AGMMinutesPage;
