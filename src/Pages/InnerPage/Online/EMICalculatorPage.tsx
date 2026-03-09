import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";
import { servicesService } from "../../../services/strapi";

interface LoanProduct {
  _id: string;
  name: string;
  rate: string;
}

const EMICalculatorPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [selectedLoanType, setSelectedLoanType] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTenure, setLoanTenure] = useState<string>('');
  const [emiResult, setEmiResult] = useState<number | null>(null);
  const [loanTypes, setLoanTypes] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch loan products from Sanity
  useEffect(() => {
    const fetchLoanProducts = async () => {
      try {
        setLoading(true);
        const data = await servicesService.getLoanProducts();
        const mappedLoanTypes = data.map((loan: any) => ({
          _id: loan._id,
          name: loan.name,
          rate: loan.rate || '0'
        }));
        setLoanTypes(mappedLoanTypes);
      } catch (error) {
        console.error('Error fetching loan products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoanProducts();
  }, [language]);

  // Auto-set interest rate when loan type is selected
  useEffect(() => {
    if (selectedLoanType) {
      const selectedProduct = loanTypes.find(product => product.name === selectedLoanType);
      if (selectedProduct) {
        // Remove % symbol if present and set the rate
        const rateValue = selectedProduct.rate.replace('%', '').trim();
        setInterestRate(rateValue);
      }
    }
  }, [selectedLoanType, loanTypes]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rateValue = parseFloat(interestRate);
    const rate = rateValue / 100 / 12; // Monthly interest rate
    const tenure = parseFloat(loanTenure) * 12; // Convert years to months

    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      setEmiResult(emi);
    }
  };

  const resetCalculator = () => {
    setLoanAmount('');
    setSelectedLoanType('');
    setInterestRate('');
    setLoanTenure('');
    setEmiResult(null);
  };

  return (
    <div>
      <BreadCrumb title={t('online.emi_calculator')} />

      {/* EMI Calculator */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center flex-col lg:flex-row gap-10">
            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                {t('online.calculate_emi')}
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('online.emi_calculator')}
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal">
                {t('online.emi_description')}
              </p>

              {emiResult && (
                <div className="mt-6 p-6 bg-khaki rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {t('online.monthly_emi')}
                  </h3>
                  <p className="text-white text-2xl font-bold">
                    रु {emiResult.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>

            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="bg-lightBlack p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center mb-8">
                  {t('online.calculate_your_emi')}
                </h2>
                
                <div className="grid items-center grid-cols-1 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.loan_amount')} (रु) *
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="जस्तै: 1000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      ऋण प्रकार *
                    </label>
                    <select
                      value={selectedLoanType}
                      onChange={(e) => setSelectedLoanType(e.target.value)}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {loading ? 'लोड हुँदैछ...' : 'ऋण प्रकार छान्नुहोस्'}
                      </option>
                      {loanTypes.map((loan) => (
                        <option key={loan.id} value={loan.name}>
                          {loan.name} ({loan.rate}% दर)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.interest_rate')} (% प्रति वर्ष) *
                    </label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="जस्तै: 12.5"
                      step="0.1"
                      readOnly={!!selectedLoanType}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent ${
                        selectedLoanType ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.loan_tenure')} (वर्षमा) *
                    </label>
                    <input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(e.target.value)}
                      placeholder="जस्तै: 5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={calculateEMI}
                      className="flex-1 bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium"
                    >
                      {t('online.calculate')}
                    </button>
                    <button
                      onClick={resetCalculator}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-all duration-300 font-medium"
                    >
                      {t('online.reset')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculatorPage;
