import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import PDFViewer from "../../../Components/Reports/PDFViewer";
import { useLanguage } from '../../../contexts/LanguageContext';
import { noticesService, googleDriveHelpers } from "../../../services/strapi";
import Swal from "sweetalert2";

// TypeScript interface for Notice from Sanity CMS with Hybrid Upload Support
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
  noticeImage?: any; // Sanity image object
  // HYBRID UPLOAD FIELDS
  fileSource?: "Upload" | "Google_Drive";
  uploadedFile?: {
    asset?: {
      url?: string;
    };
  };
  // GOOGLE DRIVE FIELDS
  attachmentFileId?: string;
  attachmentFileName?: string;
  attachmentFileSize?: string;
  viewCount?: number;
  tags?: string[];
  displayPopup?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

// Helper function to extract text from rich content
const extractTextFromContent = (content?: Array<any>): string => {
  if (!content || !Array.isArray(content)) return '';
  
  return content.map(block => {
    if (block.children && Array.isArray(block.children)) {
      return block.children.map((child: any) => child.text || '').join('');
    }
    return '';
  }).join(' ');
};

// HYBRID FILE HANDLING UTILITIES
// Get file URL based on source (Google Drive or Direct Upload)
const getNoticeFileUrl = (notice: StrapiNotice): string | null => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileId) {
    return `https://drive.google.com/file/d/${notice.attachmentFileId}/view`;
  } else if (notice.fileSource === 'Upload' && notice.uploadedFile?.asset?.url) {
    return notice.uploadedFile.asset.url;
  }
  return null;
};

// Get download URL based on source
const getNoticeDownloadUrl = (notice: StrapiNotice): string | null => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileId) {
    return googleDriveHelpers.getDownloadUrl(notice.attachmentFileId);
  } else if (notice.fileSource === 'Upload' && notice.uploadedFile?.asset?.url) {
    return notice.uploadedFile.asset.url;
  }
  return null;
};

// Get file name for display
const getNoticeFileName = (notice: StrapiNotice): string => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileName) {
    return notice.attachmentFileName;
  } else if (notice.fileSource === 'Upload' && notice.attachmentFileName) {
    return notice.attachmentFileName;
  }
  return 'Attachment';
};

// Check if notice has any file attached
const hasNoticeFile = (notice: StrapiNotice): boolean => {
  return (
    (notice.fileSource === 'Google_Drive' && !!notice.attachmentFileId) ||
    (notice.fileSource === 'Upload' && !!notice.uploadedFile?.asset?.url)
  );
};

// Get file size for display
const getNoticeFileSize = (notice: StrapiNotice): string => {
  if (notice.fileSource === 'Google_Drive' && notice.attachmentFileSize) {
    return notice.attachmentFileSize;
  }
  return '';
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

const NoticePage: React.FC = () => {
  const [notices, setNotices] = useState<StrapiNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<StrapiNotice | null>(null);

  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await noticesService.getNotices();
        setNotices(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch notices:', err);
        setError('Failed to load notices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [language]); // Depend on language from context

  const handleDownload = (notice: StrapiNotice) => {
    const downloadUrl = getNoticeDownloadUrl(notice);
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      alert('No attachment file available for this notice.');
    }
  };

  const handleView = (notice: StrapiNotice) => {
    if (hasNoticeFile(notice)) {
      setSelectedNotice(notice);
      setViewerOpen(true);
    } else {
      Swal.fire({
        icon: 'info',
        title: notice.title,
        html: `<p class="text-sm leading-6 text-left">${extractTextFromContent(notice.content) || 'No additional details available.'}</p>`,
        confirmButtonColor: '#DAA520',
        confirmButtonText: 'Close',
      });
    }
  };

  const handleShare = async (notice: StrapiNotice) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${notice.title} - GLBSL`,
          text: `Check out our notice: ${notice.title}`,
          url: `${window.location.origin}/reports/notices/${notice._id}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        alert(`${notice.title} link copied to clipboard!`);
      }
    } else {
      alert(`${notice.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      {/* PDF Viewer Modal */}
      {selectedNotice && (
        <PDFViewer
          isOpen={viewerOpen}
          onClose={() => {
            setViewerOpen(false);
            setSelectedNotice(null);
          }}
          fileUrl={selectedNotice.fileSource === 'Google_Drive' 
            ? selectedNotice.attachmentFileId || '' 
            : getNoticeFileUrl(selectedNotice) || ''}
          fileName={getNoticeFileName(selectedNotice)}
          fileSource={selectedNotice.fileSource}
        />
      )}

      <BreadCrumb title="NOTICES" home={"/"} />

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
                {t('notices.page_title')}
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
              <p className="text-center text-base lg:text-lg leading-[26px] text-gray dark:text-lightGray font-Lora font-normal mt-[10px]">
                {t('notices.page_subtitle')}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-khaki"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading notices...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Notices Grid */}
          {!loading && !error && (
            <>
              {notices.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">{t('notices.no_notices')}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
                  {notices.map((notice: StrapiNotice, index: number) => (
                    <div
                      key={notice._id}
                      className="group border border-[#e8e8e8] dark:border-[#424242] rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      data-aos="fade-up"
                      data-aos-duration={800 + (index * 200)}
                    >
                      {/* Clickable preview area */}
                      <button
                        onClick={() => handleView(notice)}
                        className="w-full text-left block"
                        aria-label={`View notice: ${notice.title}`}
                      >
                        <div className="overflow-hidden">
                          <PDFPreview
                            title={notice.title}
                            description={extractTextFromContent(notice.content) || t('notices.view_details')}
                            fileId={notice.fileSource === 'Google_Drive' ? notice.attachmentFileId : undefined}
                            fileUrl={notice.fileSource === 'Upload' ? notice.uploadedFile?.asset?.url : undefined}
                            showThumbnail={hasNoticeFile(notice)}
                          />
                        </div>
                      </button>

                      <div className="py-6 px-6 font-Garamond">
                        {notice.isUrgent && (
                          <div className="mb-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                              {t('notices.urgent')}
                            </span>
                          </div>
                        )}
                        <h2
                          className="text-xl lg:text-[22px] leading-[28px] font-semibold text-lightBlack dark:text-white py-2 cursor-pointer hover:text-khaki transition-colors duration-200"
                          onClick={() => handleView(notice)}
                        >
                          {notice.title}
                        </h2>
                        <p className="text-base font-normal text-gray dark:text-lightGray font-Lora mb-3 leading-6">
                          {extractTextFromContent(notice.content) || t('notices.view_details')}
                        </p>
                        {notice.publishDate && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {t('notices.published')}: {formatDate(notice.publishDate)}
                          </p>
                        )}

                        {hasNoticeFile(notice) && (
                          <div className="mb-4 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              📎 {getNoticeFileName(notice)}
                            </span>
                            {getNoticeFileSize(notice) && (
                              <span className="text-gray-400 ml-2">({getNoticeFileSize(notice)})</span>
                            )}
                          </div>
                        )}

                        {/* Action buttons — always visible */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button
                            onClick={() => handleView(notice)}
                            className="flex items-center gap-1 text-sm bg-khaki text-white px-3 py-1.5 rounded hover:bg-opacity-90 transition-all duration-200"
                          >
                            <BsEye className="w-3.5 h-3.5" />
                            {t('notices.view')}
                          </button>
                          {hasNoticeFile(notice) && (
                            <button
                              onClick={() => handleDownload(notice)}
                              className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-opacity-90 transition-all duration-200"
                            >
                              <BsDownload className="w-3.5 h-3.5" />
                              {t('notices.download')}
                            </button>
                          )}
                          <button
                            onClick={() => handleShare(notice)}
                            className="flex items-center gap-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                          >
                            <BsShare className="w-3.5 h-3.5" />
                            {t('notices.share')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Back to Reports Navigation */}
          <div className="flex justify-center mt-16">
            <Link
              to="/reports"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              <HiArrowLongLeft className="w-5 h-5 mr-2" />
              {t('reports.back_to_all')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticePage;
