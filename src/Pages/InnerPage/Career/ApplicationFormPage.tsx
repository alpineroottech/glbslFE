import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsPrinter } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import PDFViewer from "../../../Components/Reports/PDFViewer";
import { useLanguage } from "../../../contexts/LanguageContext";
import { noticesService, googleDriveHelpers } from "../../../services/strapi";

// Reuse the StrapiNotice interface
interface StrapiNotice {
  _id: string;
  title: string;
  slug: string;
  content?: any[]; // Portable Text blocks
  noticeType?: string;
  publishDate?: string;
  expiryDate?: string;
  isUrgent?: boolean;
  priority?: number;
  isActive?: boolean;
  fileSource?: "Upload" | "Google_Drive";
  uploadedFile?: {
    asset?: {
      url?: string;
    };
  };
  attachmentFileId?: string;
  attachmentFileName?: string;
  attachmentFileSize?: string;
}

// Helper to extract text
const extractTextFromContent = (content?: Array<any>): string => {
  if (!content || !Array.isArray(content)) return '';
  return content.map(block => {
    if (block.children && Array.isArray(block.children)) {
      return block.children.map((child: any) => child.text || '').join('');
    }
    return '';
  }).join(' ');
};

// Helper to get file URL
const getNoticeFileUrl = (notice: StrapiNotice): string | null => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileId) {
    return `https://drive.google.com/file/d/${notice.attachmentFileId}/view`;
  } else if (notice.fileSource === 'Upload' && notice.uploadedFile?.asset?.url) {
    return notice.uploadedFile.asset.url;
  }
  return null;
};

// Helper to get download URL
const getNoticeDownloadUrl = (notice: StrapiNotice): string | null => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileId) {
    return googleDriveHelpers.getDownloadUrl(notice.attachmentFileId);
  } else if (notice.fileSource === 'Upload' && notice.uploadedFile?.asset?.url) {
    return notice.uploadedFile.asset.url;
  }
  return null;
};

// Helper to get file name
const getNoticeFileName = (notice: StrapiNotice): string => {
  if (notice.attachmentFileName) {
    return notice.attachmentFileName;
  }
  return 'Application Form';
};

// Helper to get file size
const getNoticeFileSize = (notice: StrapiNotice): string => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileSize) {
    return notice.attachmentFileSize;
  }
  return '';
};

const ApplicationFormPage: React.FC = () => {
  const [applicationForm, setApplicationForm] = useState<StrapiNotice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchApplicationForm = async () => {
      try {
        setLoading(true);
        // Fetch all notices
        const response = await noticesService.getNotices();

        // Find a notice that looks like the application form
        // We look for "application form" in the title (case insensitive)
        const formNotice = response.data.find((notice: StrapiNotice) =>
          notice.title.toLowerCase().includes('application form') &&
          notice.isActive !== false
        );

        if (formNotice) {
          setApplicationForm(formNotice);
        } else {
          // If no specific form found, leave it null which shows the "No form available" state
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch application form:', err);
        setError('Failed to load application form. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationForm();
  }, [language]);

  const handleDownload = () => {
    if (!applicationForm) return;
    const downloadUrl = getNoticeDownloadUrl(applicationForm);
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      alert('No file attached to this form.');
    }
  };

  const handleView = () => {
    if (applicationForm) {
      setViewerOpen(true);
    }
  };

  const handlePrint = () => {
    if (applicationForm) {
      // For printing, we usually just open the PDF and let the browser print
      handleView();
    }
  };

  return (
    <section className="">
      {/* PDF Viewer Modal */}
      {applicationForm && (
        <PDFViewer
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          fileUrl={applicationForm.fileSource === 'Google_Drive'
            ? applicationForm.attachmentFileId || ''
            : getNoticeFileUrl(applicationForm) || ''}
          fileName={getNoticeFileName(applicationForm)}
          fileSource={applicationForm.fileSource}
        />
      )}

      <BreadCrumb title={t('page.application_forms')} home={"/"} />

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
                Job Application Form
              </h1>
              <div className="flex items-center justify-center text-center mx-auto mt-2 lg:mt-[6px]">
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] mr-5 "></div>
                <img
                  src="/images/home-1/gurans.png"
                  className="h-6 w-auto object-contain"
                  alt="Gurans Laghubitta logo"
                />
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] ml-5"></div>
              </div>
              <p className="text-center text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-Lora font-normal mt-[10px]">
                Download and fill out the application form below
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-khaki"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading application form...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Application Form Display */}
          {!loading && !error && (
            <div className="flex justify-center pt-8">
              {applicationForm ? (
                <div
                  className="w-full max-w-2xl bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Preview Thumbnail */}
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 relative group cursor-pointer" onClick={handleView}>
                          <PDFPreview
                            title={applicationForm.title}
                            description=""
                            fileId={applicationForm.fileSource === 'Google_Drive' ? applicationForm.attachmentFileId : undefined}
                            fileUrl={applicationForm.fileSource === 'Upload' ? applicationForm.uploadedFile?.asset?.url : undefined}
                            showThumbnail={true}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <BsEye className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 drop-shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Details & Actions */}
                      <div className="flex-grow">
                        <h2 className="text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                          {applicationForm.title}
                        </h2>
                        <p className="text-gray dark:text-lightGray font-Lora mb-4 text-sm leading-relaxed">
                          {extractTextFromContent(applicationForm.content) || "Please download and fill out this application form to apply for positions at GLBSL."}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">File Name:</span>
                            {getNoticeFileName(applicationForm)}
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">Size:</span>
                            {getNoticeFileSize(applicationForm)}
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold mr-2">Updated:</span>
                            {new Date(applicationForm.updatedAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={handleDownload}
                            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded transition-colors duration-300 shadow-sm"
                          >
                            <BsDownload className="w-4 h-4 mr-2" />
                            Download Form
                          </button>
                          <button
                            onClick={handleView}
                            className="flex items-center justify-center bg-khaki hover:bg-opacity-90 text-white px-6 py-2.5 rounded transition-colors duration-300 shadow-sm"
                          >
                            <BsEye className="w-4 h-4 mr-2" />
                            Preview
                          </button>
                          <button
                            onClick={handlePrint}
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded transition-colors duration-300 shadow-sm"
                          >
                            <BsPrinter className="w-4 h-4 mr-2" />
                            Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg w-full max-w-2xl border border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No application form is currently available.
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Please check back later or contact the HR department.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions Section */}
          <div className="mt-16 bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
              Application Instructions
            </h3>
            <div className="text-gray dark:text-lightGray font-Lora space-y-3">
              <p>1. <strong>Download:</strong> Click the download button above to get the official application form.</p>
              <p>2. <strong>Fill:</strong> Complete the form clearly. You can fill it digitally or print and fill it by hand.</p>
              <p>3. <strong>Attach Documents:</strong> Prepare all necessary documents (CV, photos, academic certificates, etc.).</p>
              <p>4. <strong>Submit:</strong> Submit your application to the nearest branch or via our online portal if available.</p>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex justify-center mt-16 space-x-8">
            <Link
              to="/career/notices"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              <HiArrowLongLeft className="w-5 h-5 mr-2" />
              Back to Career Notices
            </Link>
            <Link
              to="/career/apply"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              Apply Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationFormPage;
