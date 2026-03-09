import React, { useEffect, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { heroImagesService, getStrapiMediaUrl } from "../../services/strapi";
import { useLanguage } from "../../contexts/LanguageContext";

interface HeroImage {
  _id: string;
  image: any; // Sanity image object
  order: number;
}

const HeroSection: React.FC = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const data = await heroImagesService.getHeroImages();
        
        // Map the data to extract image URLs
        const mappedImages = data.map((item: any) => ({
          _id: item._id,
          image: item.image,
          order: item.order || 0
        }));
        
        setHeroImages(mappedImages);
      } catch (error) {
        console.error('Error loading hero images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, [language]);

  // Fallback images if no data from CMS
  const fallbackImages = [
    '/images/home-1/hero-bg.jpg',
    '/images/home-1/hero-bg2.jpg',
    '/images/home-1/hero-bg.jpg',
    '/images/home-1/hero-bg2.jpg'
  ];

  const imagesToShow = heroImages.length > 0 
    ? heroImages.map(img => getStrapiMediaUrl(img.image))
    : fallbackImages;

  if (loading) {
    return (
      <div className="w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px] bg-gray-200 dark:bg-normalBlack flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      <Swiper
        centeredSlides={true}
        navigation={true}
        speed={3000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {imagesToShow.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px] bg-[rgba(30,30,30,0.4)] bg-opacity-40 grid items-center bg-cover justify-center text-white relative pb-[150px] lg:pb-16 xl:pb-0"
              style={{ 
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              data-aos="fade-down"
            >
              {/* Intentionally left blank to show image only */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
