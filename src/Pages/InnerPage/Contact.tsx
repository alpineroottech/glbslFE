import React, { useState } from "react";
import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { IoIosCall } from "react-icons/io";
import Swal from "sweetalert2";
import { useLanguage } from "../../contexts/LanguageContext";
import { useRateLimitedSubmit } from "../../hooks/useRateLimitedSubmit";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateRequired,
  isFormValid,
  type FormErrors,
} from "../../utils/formValidation";

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { canSubmit, isOnCooldown, markSubmitted } = useRateLimitedSubmit({ cooldownMs: 10000 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: typeof formData): FormErrors => ({
    name: validateName(data.name) ?? '',
    email: validateEmail(data.email) ?? '',
    phone: validatePhone(data.phone) ?? '',
    subject: validateRequired(data.subject, 'Subject', 100) ?? '',
    message: validateRequired(data.message, 'Message', 1000) ?? '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (touched[name]) {
      setErrors(validate(updatedData));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.fromEntries(Object.keys(formData).map(k => [k, true]));
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (!isFormValid(validationErrors)) return;

    if (!canSubmit()) {
      Swal.fire({
        icon: 'warning',
        title: 'Please wait',
        text: 'Please wait a moment before submitting again.',
        confirmButtonColor: '#DAA520',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      Swal.fire({
        title: t('contact.sending'),
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          data: { ...formData, language }
        })
      });

      if (!response.ok) throw new Error('Failed to send email');

      markSubmitted();

      Swal.fire({
        icon: 'success',
        title: t('contact.success'),
        text: t('contact.successMessage'),
        confirmButtonColor: '#DAA520'
      });

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTouched({});
      setErrors({});

    } catch {
      Swal.fire({
        icon: 'error',
        title: t('contact.error'),
        text: t('contact.errorMessage'),
        confirmButtonColor: '#1a3a1a'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent ${
      touched[field] && errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  const errorMsg = (field: string) =>
    touched[field] && errors[field] ? (
      <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
    ) : null;

  return (
    <div>
      <BreadCrumb title={t('page.contact')} />

      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px] ">
          <div className="flex items-center flex-col md:flex-row">
            <div
              className="py-5 sm:p-5 flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                CONTACT US
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                CONTACT WITH US
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px]  text-gray dark:text-lightGray font-normal">
                Rapidiously myocardinate cross-platform intellectual capital
                after the model. Appropriately create interactive
                infrastructures after maintance Holisticly facilitate
                stand-alone
              </p>

              {/* call */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                  <IoIosCall size={22} className="text-khaki group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">Call Us Now</p>
                  <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium">021-464453</p>
                </div>
              </div>
              <hr className="dark:text-gray dark:bg-gray text-lightGray bg-lightGray h-[1px]" />

              {/* email */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                  <MdEmail size={22} className="text-khaki group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">Send us an Email</p>
                  <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium ">info@glbsl.com.np</p>
                </div>
              </div>
              <hr className="dark:text-gray dark:bg-gray text-lightGray bg-lightGray h-[1px]" />

              {/* location */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                  <MdOutlineShareLocation size={22} className="text-khaki group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">Our Location</p>
                  <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium ">
                    Buddhiganga-1,<br /> PuspalalChowk<br />Morang
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex-1 py-5 sm:p-5"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="bg-lightBlack p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center mb-8">
                  GET IN TOUCH
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-white text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClass('name')}
                      placeholder="Your Name"
                      maxLength={100}
                    />
                    {errorMsg('name')}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-white text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClass('email')}
                      placeholder="Enter E-mail"
                      maxLength={100}
                    />
                    {errorMsg('email')}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-white text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClass('phone')}
                      placeholder="Phone Number"
                      maxLength={20}
                    />
                    {errorMsg('phone')}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-white text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClass('subject')}
                    >
                      <option value="">Select Subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Loan Information">Loan Information</option>
                      <option value="Account Services">Account Services</option>
                      <option value="Other">Other</option>
                    </select>
                    {errorMsg('subject')}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-white text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClass('message')}
                      rows={6}
                      placeholder="Write Message:"
                      maxLength={1000}
                    />
                    {errorMsg('message')}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isOnCooldown}
                    className="w-full bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : isOnCooldown ? 'Message Sent!' : 'SEND MESSAGE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* google map */}
      <div data-aos="fade-down" data-aos-duration="1000">
        <iframe
          src="https://www.google.com/maps?q=Dhankuta+Municipality+Dhankuta+Nepal&output=embed"
          height={450}
          allowFullScreen={true}
          loading="lazy"
          className="w-full"
          title="GLBSL Office Location - Dhankuta, Nepal"
        />
      </div>
    </div>
  );
};

export default Contact;
