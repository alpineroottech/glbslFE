import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../../BreadCrumb/BreadCrumb';
import { useLanguage } from '../../../contexts/LanguageContext';
import JobApplicationForm from './JobApplicationForm';

const ApplyForJobPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const handleFormSubmit = async (formData: any, photo: File | null) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Here you would typically send the data to your backend API
      // For now, we'll simulate a successful submission
      
      // Form submitted successfully
      // Avoid logging sensitive form data in production
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful submission
      setSubmitSuccess(true);
      
      // You could also redirect to a success page or show a success message
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        language === 'en' 
          ? 'There was an error submitting your application. Please try again.'
          : 'तपाईंको आवेदन पेश गर्दा त्रुटि भयो। कृपया फेरि प्रयास गर्नुहोस्।'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section className="">
        <BreadCrumb title={t('submenu.apply_for_job')} home={"/"} />
        
        <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 font-Garamond mb-4">
                  {language === 'en' ? 'Application Submitted Successfully!' : 'आवेदन सफलतापूर्वक पेश भयो!'}
                </h2>
                
                <p className="text-green-700 dark:text-green-300 mb-6">
                  {language === 'en' 
                    ? 'Thank you for your application. We have received your details and will review them shortly. You will be contacted if your profile matches our requirements.'
                    : 'तपाईंको आवेदनको लागि धन्यवाद। हामीले तपाईंका विवरणहरू प्राप्त गरेका छौं र छिट्टै समीक्षा गर्नेछौं। यदि तपाईंको प्रोफाइल हाम्रो आवश्यकतासँग मेल खान्छ भने तपाईंलाई सम्पर्क गरिनेछ।'
                  }
                </p>
                
                <div className="space-x-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-khaki text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors duration-300"
                  >
                    {language === 'en' ? 'Submit Another Application' : 'अर्को आवेदन पेश गर्नुहोस्'}
                  </button>
                  
                  <Link
                    to="/career/notices"
                    className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300"
                  >
                    {language === 'en' ? 'View Job Notices' : 'जागिर सूचनाहरू हेर्नुहोस्'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <BreadCrumb title={t('submenu.apply_for_job')} home={"/"} />
      
      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white font-Garamond font-semibold capitalize">
              {t('submenu.apply_for_job')}
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
              {language === 'en' 
                ? 'Submit your application for available positions at GLBSL. Fill out the form below with your details and we will get back to you.'
                : 'GLBSL मा उपलब्ध पदहरूको लागि आफ्नो आवेदन पेश गर्नुहोस्। तलको फारम आफ्ना विवरणहरूसँग भर्नुहोस् र हामी तपाईंलाई फिर्ता सम्पर्क गर्नेछौं।'
              }
            </p>
          </div>

          {submitError && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-300 text-center">{submitError}</p>
              </div>
            </div>
          )}

          {isSubmitting ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-lg">
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-2">
                    {language === 'en' ? 'Submitting Application...' : 'आवेदन पेश गर्दै...'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'en' 
                      ? 'Please wait while we process your application.'
                      : 'कृपया प्रतीक्षा गर्नुहोस् जब हामी तपाईंको आवेदन प्रशोधन गर्दैछौं।'
                    }
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <JobApplicationForm onSubmit={handleFormSubmit} />
          )}

          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 font-Garamond mb-3">
                {language === 'en' ? 'Alternative Options' : 'वैकल्पिक विकल्पहरू'}
              </h4>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                {language === 'en' 
                  ? 'You can also download a PDF application form and submit it manually:'
                  : 'तपाईंले PDF आवेदन फारम डाउनलोड गरेर म्यानुअल रूपमा पनि पेश गर्न सक्नुहुन्छ:'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/career/application-form"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300 text-center"
                >
                  {language === 'en' ? 'Download PDF Form' : 'PDF फारम डाउनलोड गर्नुहोस्'}
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors duration-300 text-center"
                >
                  {language === 'en' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyForJobPage;
