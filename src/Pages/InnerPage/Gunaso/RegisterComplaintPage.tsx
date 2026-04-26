import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getBranches } from "../../Branches/data/index";
import Swal from "sweetalert2";
import { useRateLimitedSubmit } from "../../../hooks/useRateLimitedSubmit";
import {
  validateName,
  validatePhone,
  validateRequired,
  isFormValid,
  type FormErrors,
} from "../../../utils/formValidation";

const RegisterComplaintPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { canSubmit, isOnCooldown, markSubmitted } = useRateLimitedSubmit({ cooldownMs: 10000 });

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    branchOffice: '',
    complaint: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const branchData = getBranches();
    setBranches(branchData.map(branch => branch.name));
  }, []);

  const validate = (data: typeof formData): FormErrors => ({
    fullName: validateName(data.fullName) ?? '',
    mobileNumber: validatePhone(data.mobileNumber) ?? '',
    branchOffice: validateRequired(data.branchOffice, 'Branch Office') ?? '',
    complaint: validateRequired(data.complaint, 'Complaint details', 2000) ?? '',
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
        title: t('complaint.sending'),
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'complaint',
          data: { ...formData, language }
        })
      });

      if (!response.ok) throw new Error('Failed to send email');

      markSubmitted();

      Swal.fire({
        icon: 'success',
        title: t('complaint.success'),
        text: t('complaint.successMessage'),
        confirmButtonColor: '#DAA520'
      });

      setFormData({ fullName: '', mobileNumber: '', branchOffice: '', complaint: '' });
      setTouched({});
      setErrors({});

    } catch {
      Swal.fire({
        icon: 'error',
        title: t('complaint.error'),
        text: t('complaint.errorMessage'),
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
      <BreadCrumb title={t('gunaso.register_complaint')} />

      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center flex-col lg:flex-row gap-10">
            <div className="flex-1" data-aos="zoom-in-up" data-aos-duration="1000">
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                {t('gunaso.complaint_service')}
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('gunaso.register_complaint')}
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal mb-6">
                {t('gunaso.complaint_description')}
              </p>

              <div className="space-y-4">
                {[
                  t('gunaso.feature_1'),
                  t('gunaso.feature_2'),
                  t('gunaso.feature_3'),
                  t('gunaso.feature_4'),
                ].map((item) => (
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
                  {t('gunaso.register_form_title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="complaint-fullName" className="block text-white text-sm font-medium mb-2">
                      {t('gunaso.full_name_label')}
                    </label>
                    <input id="complaint-fullName" type="text" name="fullName" value={formData.fullName}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('fullName')} placeholder={t('gunaso.full_name_placeholder')} maxLength={100} />
                    {errorMsg('fullName')}
                  </div>

                  <div>
                    <label htmlFor="complaint-mobileNumber" className="block text-white text-sm font-medium mb-2">
                      {t('gunaso.mobile_label')}
                    </label>
                    <input id="complaint-mobileNumber" type="tel" name="mobileNumber" value={formData.mobileNumber}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('mobileNumber')} placeholder={t('gunaso.mobile_placeholder')} maxLength={20} />
                    <p className="text-xs text-gray-300 mt-1">{t('gunaso.mobile_note')}</p>
                    {errorMsg('mobileNumber')}
                  </div>

                  <div>
                    <label htmlFor="complaint-branchOffice" className="block text-white text-sm font-medium mb-2">
                      {t('gunaso.branch_label')}
                    </label>
                    <select id="complaint-branchOffice" name="branchOffice" value={formData.branchOffice}
                      onChange={handleInputChange} onBlur={handleBlur} className={inputClass('branchOffice')}>
                      <option value="">{t('gunaso.branch_placeholder')}</option>
                      {branches.map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                      ))}
                    </select>
                    {errorMsg('branchOffice')}
                  </div>

                  <div>
                    <label htmlFor="complaint-complaint" className="block text-white text-sm font-medium mb-2">
                      {t('gunaso.complaint_label')}
                    </label>
                    <textarea id="complaint-complaint" name="complaint" value={formData.complaint}
                      onChange={handleInputChange} onBlur={handleBlur}
                      className={inputClass('complaint')} rows={6}
                      placeholder={t('gunaso.complaint_placeholder')} maxLength={2000} />
                    {errorMsg('complaint')}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isOnCooldown}
                    className="w-full bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('gunaso.submitting') : isOnCooldown ? t('complaint.success') : t('gunaso.submit_button')}
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

export default RegisterComplaintPage;
