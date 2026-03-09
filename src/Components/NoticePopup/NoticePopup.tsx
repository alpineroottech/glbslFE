import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { noticesService, getStrapiMediaUrl } from '../../services/strapi';

interface Notice {
  _id: string;
  slug?: string;
  title?: string;
  noticeImage?: any; // Sanity image object
  uploadedFile?: {
    asset?: {
      url?: string;
      originalFilename?: string;
      mimeType?: string;
    };
  };
}

const NoticePopup: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopupNotices = async () => {
      try {
        const data = await noticesService.getPopupNotices();
        if (data && data.length > 0) {
          setNotices(data);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error fetching popup notices:', error);
      }
    };

    fetchPopupNotices();
  }, []);

  useEffect(() => {
    if (!isVisible || notices.length === 0) return;

    // Auto-close current popup after 15 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 15000);

    return () => clearTimeout(timer);
  }, [isVisible, currentIndex, notices.length]);

  const handleClose = () => {
    if (currentIndex < notices.length - 1) {
      // Show next notice
      setCurrentIndex(currentIndex + 1);
    } else {
      // Close all popups
      setIsVisible(false);
    }
  };

  const handleNoticeClick = () => {
    // Navigate to notices page instead of specific notice
    setIsVisible(false);
    navigate('/reports/notices');
  };

  if (!isVisible || notices.length === 0) {
    return null;
  }

  const currentNotice = notices[currentIndex];
  
  // Extract file URL from uploadedFile (PDF or any document) or noticeImage
  const fileUrl = currentNotice?.uploadedFile?.asset?.url || null;
  const imageUrl = currentNotice?.noticeImage ? getStrapiMediaUrl(currentNotice.noticeImage) : null;
  const fullFileUrl = fileUrl || imageUrl || '';
  const fileName = currentNotice?.uploadedFile?.asset?.originalFilename || 'Notice';
  const mimeType = currentNotice?.uploadedFile?.asset?.mimeType || '';
  const title = currentNotice?.title || 'Notice';

  // Validate URL for iframe/image safety
  const isValidUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ['https:', 'http:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  if (!fullFileUrl || !isValidUrl(fullFileUrl)) {
    return null;
  }

  // Check if it's a PDF
  const isPDF = mimeType === 'application/pdf' || fullFileUrl.endsWith('.pdf');
  const isImage = mimeType.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(fullFileUrl);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-[9998] transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative max-w-[90vw] max-h-[90vh] w-full pointer-events-auto"
          style={{ aspectRatio: 'auto' }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 z-[10000] bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Close popup"
          >
            <IoMdClose className="w-6 h-6" />
          </button>

          {/* Notice File - Clickable (PDF or Image) */}
          <div 
            onClick={handleNoticeClick}
            className="w-full h-full cursor-pointer rounded-lg overflow-hidden shadow-2xl bg-white"
          >
            {isPDF ? (
              // Display PDF in iframe
              <iframe
                src={fullFileUrl}
                title={title}
                className="w-full h-full"
                style={{ minHeight: '80vh', border: 'none' }}
              />
            ) : isImage ? (
              // Display Image
              <img
                src={fullFileUrl}
                alt={title}
                className="w-full h-full object-contain"
                style={{ maxHeight: '90vh' }}
              />
            ) : (
              // Fallback for other file types - show download link
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{fileName}</p>
                <a
                  href={fullFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-khaki hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open Document
                </a>
              </div>
            )}
          </div>

          {/* Notice Counter (if multiple) */}
          {notices.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-sm font-Lora">
              {currentIndex + 1} / {notices.length}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NoticePopup;
