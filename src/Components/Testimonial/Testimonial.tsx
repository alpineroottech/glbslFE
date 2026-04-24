import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { testimonialsService, getStrapiMediaUrl } from "../../services/strapi";

// TypeScript interface for Testimonial from Sanity
interface StrapiTestimonial {
  _id: string;
  name: string;
  testimonial: string;
  organization?: string;
  position?: string;
  image?: any; // Sanity image object
  order?: number;
  isActive?: boolean;
}

const Testimonial: React.FC = () => {
  const [testimonials, setTestimonials] = useState<StrapiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
    },
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialsService.getTestimonials();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setError('Failed to load testimonials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [language]);

  // Render a single testimonial card
  const renderTestimonialCard = (testimonial: StrapiTestimonial) => {
    const imageUrl = testimonial.image
      ? getStrapiMediaUrl(testimonial.image)
      : "/images/home-1/testi-author.png"; // Default fallback image

    return (
      <div className="bg-white dark:bg-normalBlack p-5 md:p-10 relative before:absolute before:w-[85%] before:h-[10px] before:bg-khaki before:mx-auto before:-top-[10px] before:left-0 before:right-0 after:absolute after:w-[85%] after:h-[10px] after:bg-khaki after:mx-auto after:-bottom-[10px] after:left-0 after:right-0">
        {/* quote icon */}
        <img
          src="/images/home-1/testi-quote.png"
          alt=""
          className="absolute right-3 xl:right-10 -top-8"
        />

        <p className="font-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal xl:text-lg mt-[30px] italic mb-[45px] before:absolute before:h-[30px] before:left-0 before:bottom-[-36px] before:bg-khaki before:w-[1px] relative">
          "{testimonial.testimonial}"
        </p>
        <span className="w-[1px] h-[25px] bg-[#ddd]"></span>

        <div className="flex items-center space-x-6">
          <img
            src={imageUrl}
            className="w-[65px] h-[65px] rounded-full object-cover"
            alt={testimonial.name}
          />

          <div>
            <h4 className="text-base lg:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
              {testimonial.name}
            </h4>
            {(testimonial.position || testimonial.organization) && (
              <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center">
                <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                {testimonial.position}
                {testimonial.position && testimonial.organization && ", "}
                {testimonial.organization}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-[url('/images/home-1/testi-bg.jpg')] bg-[rgba(30,30,30,0.4)] dark:bg-[rgba(30,30,30,0.6)] bg-opacity-40 grid items-center justify-center bg-no-repeat bg-cover">
      <div className="Container py-20 lg:py-[120px]">
        {/* section title */}
        <div
          className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Section logo */}
          <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-5">
            <hr className="w-[100px] h-[1px] text-[#473f39]" />
            <img
              src="/images/home-1/section-shape1.png"
              alt="room_section_logo"
              className="w-[50px] h-[50px]"
            />
            <hr className="w-[100px] h-[1px] text-[#473f39]" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-white mt-[20px] mb-[16px] font-Garamond font-semibold uppercase">
            Customer Testimonials
          </h1>
          <p className="font-Lora leading-7 lg:leading-[26px] text-white font-normal text-sm sm:text-base">
            Hear what our valued customers have to say about their experience with us
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-khaki"></div>
              <p className="mt-4 text-white">Loading testimonials...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Testimonials Content */}
        {!loading && !error && testimonials.length > 0 && (
          <>
            {/* Very small screen - Show first testimonial */}
            <div
              className="mt-14 sm:hidden px-1"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="py-[10px] pt-4">
                {renderTestimonialCard(testimonials[0])}
              </div>
            </div>

            {/* Larger screens - Carousel */}
            <div
              className="mt-14 2xl:mt-[60px] relative keen-slider hidden sm:block"
              ref={sliderRef}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="keen-slider__slide number-slide1"
                >
                  <div
                    className="py-[10px] pt-10"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {renderTestimonialCard(testimonial)}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            {loaded && instanceRef.current && testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="bg-khaki hover:bg-opacity-80 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="bg-khaki hover:bg-opacity-80 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {/* No testimonials state */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white opacity-80">No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
