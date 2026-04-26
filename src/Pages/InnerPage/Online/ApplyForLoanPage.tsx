import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getBranches } from "../../Branches/data/index";
import Swal from "sweetalert2";
import { useRateLimitedSubmit } from "../../../hooks/useRateLimitedSubmit";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateRequired,
  validatePositiveNumber,
  isFormValid,
  type FormErrors,
} from "../../../utils/formValidation";

const ApplyForLoanPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { canSubmit, isOnCooldown, markSubmitted } = useRateLimitedSubmit({ cooldownMs: 10000 });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    branchOffice: '',
    province: '',
    district: '',
    localBody: '',
    wardNumber: '',
    loanAmount: '',
    specialNote: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const branchData = getBranches();
    setBranches(branchData.map(branch => branch.name));
  }, []);

  const provinces = [
    'प्रदेश नं. १',
    'मधेस प्रदेश',
    'बागमती प्रदेश',
    'गण्डकी प्रदेश',
    'लुम्बिनी प्रदेश',
    'कर्णाली प्रदेश',
    'सुदूरपश्चिम प्रदेश'
  ];

  const validate = (data: typeof formData): FormErrors => ({
    fullName: validateName(data.fullName) ?? '',
    email: validateEmail(data.email) ?? '',
    mobileNumber: validatePhone(data.mobileNumber) ?? '',
    branchOffice: validateRequired(data.branchOffice, 'Branch Office') ?? '',
    province: validateRequired(data.province, 'Province') ?? '',
    district: validateRequired(data.district, 'District', 100) ?? '',
    localBody: validateRequired(data.localBody, 'Local Body', 100) ?? '',
    wardNumber: validatePositiveNumber(data.wardNumber, 'Ward Number') ?? '',
    loanAmount: validatePositiveNumber(data.loanAmount, 'Loan Amount') ?? '',
    specialNote: validateRequired(data.specialNote, 'Special Note', 2000) ?? '',
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
        title: t('loan.sending'),
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'loan',
          data: { ...formData, language }
        })
      });

      if (!response.ok) throw new Error('Failed to send email');

      markSubmitted();

      Swal.fire({
        icon: 'success',
        title: t('loan.success'),
        text: t('loan.successMessage'),
        confirmButtonColor: '#DAA520'
      });

      setFormData({
        fullName: '', email: '', mobileNumber: '', branchOffice: '',
        province: '', district: '', localBody: '', wardNumber: '',
        loanAmount: '', specialNote: ''
      });
      setTouched({});
      setErrors({});

    } catch {
      Swal.fire({
        icon: 'error',
        title: t('loan.error'),
        text: t('loan.errorMessage'),
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
      <BreadCrumb title={t('online.apply_for_loan')} />

      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center flex-col lg:flex-row gap-10">
            <div className="flex-1" data-aos="zoom-in-up" data-aos-duration="1000">
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                {t('online.loan_application')}
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('online.apply_for_loan')}
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal mb-6">
                {t('online.loan_application_description')}
              </p>

              <div className="space-y-4">
                {['कम ब्याज दरमा ऋण सुविधा', 'छिटो प्रक्रिया र अनुमोदन', 'न्यूनतम कागजी कारबाही', 'लचकदार फिर्ता गर्ने विकल्प'].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                    <p className="text-sm text-gray dark:text-lightGray">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1" data-aos="zoom-in-up" data-aos-duration="1000">
              <div className="bg-lightBlack p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center mb-8">
                  ऋण आवेदन फारम
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="loan-fullName" className="block text-white text-sm font-medium mb-2">पुरा नाम *</label>
                    <input id="loan-fullName" type="text" name="fullName" value={formData.fullName}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('fullName')} placeholder="तपाईंको पुरा नाम लेख्नुहोस्" maxLength={100} />
                    {errorMsg('fullName')}
                  </div>

                  <div>
                    <label htmlFor="loan-email" className="block text-white text-sm font-medium mb-2">इमेल ठेगाना *</label>
                    <input id="loan-email" type="email" name="email" value={formData.email}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('email')} placeholder="example@email.com" maxLength={100} />
                    {errorMsg('email')}
                  </div>

                  <div>
                    <label htmlFor="loan-mobileNumber" className="block text-white text-sm font-medium mb-2">मोवाइल नम्बर *</label>
                    <input id="loan-mobileNumber" type="tel" name="mobileNumber" value={formData.mobileNumber}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('mobileNumber')} placeholder="98XXXXXXXX" maxLength={20} />
                    <p className="text-xs text-gray-300 mt-1">नोट: कृपया सही फोन नम्बर प्रविष्ट गर्नुहोस् हामी तपाईंलाई फोन नम्बर मार्फत सम्पर्क गर्नेछौं।</p>
                    {errorMsg('mobileNumber')}
                  </div>

                  <div>
                    <label htmlFor="loan-branchOffice" className="block text-white text-sm font-medium mb-2">पायक पर्ने शाखा कार्यालय छान्नुहोस् । *</label>
                    <select id="loan-branchOffice" name="branchOffice" value={formData.branchOffice}
                      onChange={handleInputChange} onBlur={handleBlur} className={inputClass('branchOffice')}>
                      <option value="">शाखा छान्नुहोस्</option>
                      {branches.map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                      ))}
                    </select>
                    {errorMsg('branchOffice')}
                  </div>

                  <div>
                    <label htmlFor="loan-province" className="block text-white text-sm font-medium mb-2">प्रदेश *</label>
                    <select id="loan-province" name="province" value={formData.province}
                      onChange={handleInputChange} onBlur={handleBlur} className={inputClass('province')}>
                      <option value="">प्रदेश छान्नुहोस्</option>
                      {provinces.map((province, index) => (
                        <option key={index} value={province}>{province}</option>
                      ))}
                    </select>
                    {errorMsg('province')}
                  </div>

                  <div>
                    <label htmlFor="loan-district" className="block text-white text-sm font-medium mb-2">जिल्ला *</label>
                    <input id="loan-district" type="text" name="district" value={formData.district}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('district')} placeholder="जिल्लाको नाम" maxLength={100} />
                    {errorMsg('district')}
                  </div>

                  <div>
                    <label htmlFor="loan-localBody" className="block text-white text-sm font-medium mb-2">हालको स्थानीय तहको नाम *</label>
                    <input id="loan-localBody" type="text" name="localBody" value={formData.localBody}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('localBody')} placeholder="नगरपालिका/गाउँपालिकाको नाम" maxLength={100} />
                    {errorMsg('localBody')}
                  </div>

                  <div>
                    <label htmlFor="loan-wardNumber" className="block text-white text-sm font-medium mb-2">वडा नं. *</label>
                    <input id="loan-wardNumber" type="number" name="wardNumber" value={formData.wardNumber}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('wardNumber')} placeholder="वडा नम्बर" min="1" max="35" />
                    {errorMsg('wardNumber')}
                  </div>

                  <div>
                    <label htmlFor="loan-loanAmount" className="block text-white text-sm font-medium mb-2">कर्जा रकम रु *</label>
                    <input id="loan-loanAmount" type="number" name="loanAmount" value={formData.loanAmount}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('loanAmount')} placeholder="जस्तै: 500000" min="1" />
                    {errorMsg('loanAmount')}
                  </div>

                  <div>
                    <label htmlFor="loan-specialNote" className="block text-white text-sm font-medium mb-2">अन्य विशेष केहि भन्नु पर्ने भए यहाँ लेख्नु होस । *</label>
                    <textarea id="loan-specialNote" name="specialNote" value={formData.specialNote}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('specialNote')} rows={4}
                      placeholder="तपाईंको विशेष आवश्यकता वा टिप्पणी लेख्नुहोस्" maxLength={2000} />
                    {errorMsg('specialNote')}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isOnCooldown}
                    className="w-full bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'पेश गर्दै...' : isOnCooldown ? 'आवेदन पेश भयो!' : 'आवेदन पेश गर्नुहोस्'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLoanPage;
