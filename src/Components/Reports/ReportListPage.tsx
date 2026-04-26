import React, { useState, useEffect, useCallback } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "./PDFPreview";
import PDFViewer from "./PDFViewer";
import { reportsService, googleDriveHelpers } from "../../services/strapi";

export interface StrapiReport {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  reportType?: string;
  publishDate?: string;
  fiscalYear?: string;
  quarter?: string;
  fileSource?: "Upload" | "Google_Drive";
  uploadedFile?: { asset?: { url?: string } };
  fileId?: string;
  fileName?: string;
  featured?: boolean;
  isActive?: boolean;
  order?: number;
  tags?: string[];
}

interface ReportListPageProps {
  reportType: string;
  breadcrumbTitle: string;
  pageTitle: string;
  pageSubtitle: string;
}

const PAGE_SIZE = 9;

// ── File helpers ──────────────────────────────────────────────────
const getFileUrl = (r: StrapiReport): string | null => {
  if (r.fileSource === "Google_Drive" && r.fileId)
    return `https://drive.google.com/file/d/${r.fileId}/view`;
  if (r.fileSource === "Upload" && r.uploadedFile?.asset?.url)
    return r.uploadedFile.asset.url;
  return null;
};

const getDownloadUrl = (r: StrapiReport): string | null => {
  if (r.fileSource === "Google_Drive" && r.fileId)
    return googleDriveHelpers.getDownloadUrl(r.fileId);
  if (r.fileSource === "Upload" && r.uploadedFile?.asset?.url)
    return r.uploadedFile.asset.url;
  return null;
};

const getFileName = (r: StrapiReport): string =>
  r.fileName || `${r.title}.pdf`;

// ── Component ─────────────────────────────────────────────────────
const ReportListPage: React.FC<ReportListPageProps> = ({
  reportType,
  breadcrumbTitle,
  pageTitle,
  pageSubtitle,
}) => {
  const [reports, setReports] = useState<StrapiReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<StrapiReport | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportsService.getReportsByType(reportType);
      setReports(response.data || []);
      setCurrentPage(1);
    } catch {
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [reportType]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const totalPages = Math.ceil(reports.length / PAGE_SIZE);
  const paginatedReports = reports.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleView = (report: StrapiReport) => {
    setSelectedReport(report);
    setViewerOpen(true);
  };

  const handleDownload = (report: StrapiReport) => {
    const url = getDownloadUrl(report);
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No file available for download.");
    }
  };

  const handleShare = async (report: StrapiReport) => {
    const shareUrl = `${window.location.origin}/reports/${reportType}/${report.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${report.title} - GLBSL`, url: shareUrl });
      } catch {
        // user cancelled — silently ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch {
        alert(shareUrl);
      }
    }
  };

  return (
    <section>
      <BreadCrumb title={breadcrumbTitle} home="/" />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container">
          {/* Section heading */}
          <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-duration="1000">
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-tight text-lightBlack dark:text-white font-Garamond font-semibold capitalize">
                {pageTitle}
              </h1>
              <div className="flex items-center justify-center text-center mx-auto mt-2">
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] mr-5" />
                <img
                  src="/images/home-1/gurans.png"
                  className="h-6 w-auto object-contain"
                  alt="Gurans Laghubitta logo"
                />
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] ml-5" />
              </div>
              <p className="text-center text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-Lora font-normal mt-[10px]">
                {pageSubtitle}
              </p>
              {reports.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {reports.length} report{reports.length !== 1 ? "s" : ""} total
                </p>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki mx-auto" />
                <p className="mt-4 text-gray dark:text-lightGray">Loading reports…</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchReports}
                  className="px-6 py-2 bg-khaki text-white rounded hover:bg-opacity-90 transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && reports.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray dark:text-lightGray">
                No reports available at the moment.
              </p>
            </div>
          )}

          {/* Reports grid */}
          {!loading && !error && reports.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {paginatedReports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-white dark:bg-normalBlack shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm overflow-hidden"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    {/* PDF thumbnail — clicking opens viewer */}
                    <button
                      onClick={() => handleView(report)}
                      className="block w-full text-left"
                      aria-label={`View ${report.title}`}
                    >
                      <PDFPreview title={report.title} description={report.description || ""} />
                    </button>

                    {/* Card body */}
                    <div className="border border-[#e8e8e8] dark:border-[#424242] border-t-0">
                      <div className="py-5 px-6">
                        <p className="text-xs leading-[24px] text-khaki uppercase font-semibold font-Garamond">
                          {report.publishDate || report.fiscalYear || "—"}
                          {report.quarter && ` · ${report.quarter}`}
                        </p>
                        <h2 className="text-base lg:text-lg font-semibold text-lightBlack dark:text-white font-Garamond py-2 line-clamp-2">
                          {report.title}
                        </h2>
                        {report.description && (
                          <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-4 line-clamp-2">
                            {report.description}
                          </p>
                        )}

                        {/* Action buttons — always visible */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          <button
                            onClick={() => handleView(report)}
                            className="flex items-center gap-1 text-xs bg-khaki text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300"
                          >
                            <BsEye className="w-3 h-3" />
                            View
                          </button>
                          {getDownloadUrl(report) && (
                            <button
                              onClick={() => handleDownload(report)}
                              className="flex items-center gap-1 text-xs bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300"
                            >
                              <BsDownload className="w-3 h-3" />
                              Download
                            </button>
                          )}
                          <button
                            onClick={() => handleShare(report)}
                            className="flex items-center gap-1 text-xs bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300"
                          >
                            <BsShare className="w-3 h-3" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 text-sm border border-lightGray dark:border-gray rounded-sm disabled:opacity-40 hover:bg-khaki hover:text-white hover:border-khaki transition-all duration-300"
                  >
                    <HiArrowLongLeft className="w-4 h-4" /> Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 text-sm rounded-sm border transition-all duration-300 ${
                        currentPage === page
                          ? "bg-khaki text-white border-khaki"
                          : "border-lightGray dark:border-gray hover:bg-khaki hover:text-white hover:border-khaki"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 text-sm border border-lightGray dark:border-gray rounded-sm disabled:opacity-40 hover:bg-khaki hover:text-white hover:border-khaki transition-all duration-300"
                  >
                    Next <HiArrowLongRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Back link */}
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
          fileUrl={
            selectedReport.fileSource === "Google_Drive"
              ? selectedReport.fileId || ""
              : getFileUrl(selectedReport) || ""
          }
          fileName={getFileName(selectedReport)}
          fileSource={selectedReport.fileSource}
        />
      )}
    </section>
  );
};

export default ReportListPage;
