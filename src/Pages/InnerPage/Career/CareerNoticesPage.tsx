import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import PDFViewer from "../../../Components/Reports/PDFViewer";
import { useLanguage } from "../../../contexts/LanguageContext";
import { noticesService, googleDriveHelpers } from "../../../services/strapi";

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
  if (notice.attachmentFileName) {
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

const CareerNoticesPage: React.FC = () => {
  const [notices, setNotices] = useState<StrapiNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<StrapiNotice | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        // Fetch ALL notices and filter client-side to avoid API filter issues
        // This ensures we get the same data as the Notices page
        const response = await noticesService.getNotices();

        // Filter for career notices (case-insensitive check)
        const careerNotices = response.data.filter((notice: StrapiNotice) =>
          notice.noticeType?.toLowerCase() === 'career'
        );

        setNotices(careerNotices);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch career notices:', err);
        setError('Failed to load career notices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [language]);

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
      alert('No attachment file available for this notice.');
    }
  };

  const handleShare = async (notice: StrapiNotice) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${notice.title} - GLBSL Career`,
          text: `Check out this job opportunity: ${notice.title}`,
          url: `${window.location.origin}/career/notices/${notice._id}`,
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

      <BreadCrumb title="CAREER OPPORTUNITIES" home={"/"} />

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
                Career Opportunities & Job Vacancies
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
                Join our team and build your career with us. Explore current job openings and opportunities
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-khaki"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading career notices...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Career Notices Grid */}
          {!loading && !error && (
            <>
              {notices.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">No career opportunities available at the moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
                  {notices.map((notice, index) => (
                    <div
                      key={notice._id}
                      className="overflow-x-hidden 3xl:w-[410px] group"
                      data-aos="fade-up"
                      data-aos-duration={800 + (index * 200)}
                    >
                      <div className="relative">
                        <div className="overflow-hidden">
                          <PDFPreview
                            title={notice.title}
                            description={extractTextFromContent(notice.content) || "Click to view details"}
                            fileId={notice.fileSource === 'Google_Drive' ? notice.attachmentFileId : undefined}
                            fileUrl={notice.fileSource === 'Upload' ? notice.uploadedFile?.asset?.url : undefined}
                            showThumbnail={hasNoticeFile(notice)}
                          />
                        </div>

                        {hasNoticeFile(notice) && (
                          <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                            <button
                              onClick={() => handleView(notice)}
                              className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                              title="View PDF"
                            >
                              <BsEye className="w-3 h-3 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(notice)}
                              className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                              title="Download PDF"
                            >
                              <BsDownload className="w-3 h-3 mr-1" />
                              Download
                            </button>
                            <button
                              onClick={() => handleShare(notice)}
                              className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                              title="Share Job Posting"
                            >
                              <BsShare className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="font-Garamond">
                        <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                          <div className="py-6 px-[30px]">
                            {notice.isUrgent && (
                              <div className="mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                                  Urgent
                                </span>
                              </div>
                            )}
                            <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                              {notice.title}
                            </h2>
                            <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                              {extractTextFromContent(notice.content) || "No description available"}
                            </p>
                            {notice.publishDate && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Published: {formatDate(notice.publishDate)}
                              </p>
                            )}

                            {/* File Information */}
                            {hasNoticeFile(notice) && (
                              <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    📎 {getNoticeFileName(notice)}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    {notice.fileSource === 'Upload' && (
                                      <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        Direct Download
                                      </span>
                                    )}
                                    {notice.fileSource === 'Google_Drive' && (
                                      <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                        Google Drive
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {getNoticeFileSize(notice) && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Size: {getNoticeFileSize(notice)}
                                  </p>
                                )}
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleView(notice)}
                                className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                              >
                                View Details
                              </button>
                              <span className="text-xs text-gray-300">|</span>
                              <button
                                onClick={() => handleDownload(notice)}
                                className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Back to Career Navigation */}
          <div className="flex justify-center mt-16">
            <Link
              to="/career/apply"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300 mr-8"
            >
              Apply for Jobs
            </Link>
            <Link
              to="/career/application-form"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              Download Application Form
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerNoticesPage;
