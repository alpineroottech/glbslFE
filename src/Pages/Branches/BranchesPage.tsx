import React, { useState, useEffect } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import BranchTile from "./components/BranchTile";
import { getBranches, BranchData } from "./data";
import { useLanguage } from "../../contexts/LanguageContext";

// BranchesPage component - main page for displaying all bank branches
// Follows the same design patterns as other pages in the application
const BranchesPage: React.FC = () => {
  const { t } = useLanguage();
  
  // State for branch data
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filtering (optional feature for future enhancement)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");

  // Load branch data on component mount
  useEffect(() => {
    try {
      setLoading(true);
      // Currently using static data - will be replaced with API call to Strapi
      const branchData = getBranches();
      setBranches(branchData);
      setError(null);
    } catch (err) {
      console.error('Error loading branch data:', err);
      setError('Failed to load branch information. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter branches based on search term and province selection
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = searchTerm === "" || 
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProvince = selectedProvince === "all" || 
      branch.location.toLowerCase().includes(selectedProvince.toLowerCase());
    
    return matchesSearch && matchesProvince;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen">
        <BreadCrumb title={t('page.our_branches')} home="/" />
        <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-normalBlack dark:border-white mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading branch information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        <BreadCrumb title={t('page.our_branches')} home="/" />
        <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="text-center">
              <div className="text-red-500 dark:text-red-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Unable to Load Branches
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen">
      {/* Breadcrumb navigation */}
      <BreadCrumb title={t('page.our_branches')} home="/" />

      {/* Main content */}
      <section className="dark:bg-normalBlack">
        <div className="Container py-20 2xl:py-[120px]">
          
          {/* Page header - following the same pattern as About page */}
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container mb-16">
            
            {/* Section logo - reusing design pattern from other pages */}
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img
                src="/images/home-1/gurans.png"
                alt="Gurans Laghubitta logo"
                className="h-8 w-auto object-contain"
              />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            </div>
            
            {/* Page title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              Our Branches Across Nepal
            </h1>
            
            {/* Page description */}
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Discover our extensive network of {branches.length} branches serving communities across Nepal. 
              Each branch is managed by experienced professionals dedicated to providing exceptional banking services.
            </p>
          </div>

          {/* Search and filter section (optional enhancement) */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search branches by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-normalBlack dark:focus:ring-white"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>

              {/* Province filter dropdown */}
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-normalBlack dark:focus:ring-white"
              >
                <option value="all">All Locations</option>
                <option value="kathmandu">Kathmandu Valley</option>
                <option value="pokhara">Gandaki Province</option>
                <option value="biratnagar">Province 1</option>
                <option value="birgunj">Madhesh Province</option>
                <option value="nepalgunj">Lumbini Province</option>
                <option value="dhangadhi">Sudurpashchim Province</option>
                <option value="tulsipur">Karnali Province</option>
              </select>
            </div>

            {/* Results count */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredBranches.length} of {branches.length} branches
              </p>
            </div>
          </div>

          {/* Branches grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <BranchTile
                  id={branch.id}
                  name={branch.name}
                  location={branch.location}
                  address={branch.address}
                  phoneNumber={branch.phoneNumber}
                  manager={branch.manager}
                  coordinates={branch.coordinates}
                />
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredBranches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No branches found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search criteria or browse all locations.
              </p>
            </div>
          )}

          {/* Additional information section */}
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                Can't Find Your Nearest Branch?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-Lora">
                We're constantly expanding our network to serve you better. 
                Contact our customer service team for assistance or check back regularly for new branch openings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+977-1-4000000"
                  className="inline-flex items-center justify-center px-6 py-3 bg-normalBlack text-white font-medium rounded-lg hover:bg-lightBlack transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Call Customer Service
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-normalBlack dark:border-white text-normalBlack dark:text-white font-medium rounded-lg hover:bg-normalBlack dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BranchesPage;
