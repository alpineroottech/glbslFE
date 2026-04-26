import React from "react";
import { Link, NavLink } from "react-router-dom";
import useScrollPosition from "./useScrollPosition";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import SearchBar from "../SearchBar/SearchBar";

const Navbar: React.FC = () => {
  // modal openar
  const [isOpen, setIsOpen] = useState(false);
  // language context
  const { language, setLanguage, t } = useLanguage();
  // scrolling tracker
  const scrollPosition = useScrollPosition();
  // background color add and remover
  const navbarBgColor = "lg:bg-lightBlack"; // Always opaque for better accessibility

  const toggleNavbar = (): void => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = (): void => {
    const newLanguage = language === 'en' ? 'ne' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <nav
      className={` w-full lg:fixed font-Lora z-10  lg:px-5 lg:py-4  transition-all duration-300 ${navbarBgColor} `}
    >
      <div className="lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:min-h-[80px]">
          {/* website Logo */}
          <div className="lg:p-2 lg:pr-6 flex-shrink-0">
            <Link to="/">
              <img
                src="/images/home-1/gurans.png"
                className="hidden lg:block h-14 w-auto max-w-[200px] object-contain"
                alt="Gurans Laghubitta logo"
              />
            </Link>
          </div>
          {/* small screen size */}
          <div className="px-3 w-full lg:hidden flex justify-between text-lightBlack lg:text-white dark:text-white bg-khaki h-[70px] items-center p-3">
            <div className="w-36">
              <Link to="/">
                <img
                  src="/images/home-1/gurans.png"
                  className="block lg:hidden h-12 w-auto max-w-[160px] object-contain"
                  alt="Gurans Laghubitta logo"
                />
              </Link>
            </div>

            {/* toggle bar and language toggle. */}
            <div className="flex items-center ">
              <span onClick={toggleLanguage} className="mr-3 cursor-pointer">
                <span 
                  className="language-toggle"
                  title={language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
                >
                  {language === 'en' ? 'NE' : 'EN'}
                </span>
              </span>
              <button
                className="lg:hidden block focus:outline-none "
                onClick={toggleNavbar}
              >
                {/* modal open and close */}
                {isOpen ? (
                  <IoMdClose className="w-6 h-6 text-white" />
                ) : (
                  <FaBars className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar - shown when menu is open */}
          {isOpen && (
            <div className="lg:hidden bg-white dark:bg-normalBlack border-t border-gray-200 dark:border-gray-700">
              <SearchBar isMobile={true} />
            </div>
          )}
          
          {/* All navLink are hear with active */}
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } text-left w-full lg:w-fit ease-in-out lg:flex space-y-2 lg:space-y-0 lg:text-center space-x-0 lg:space-x-2 xl:space-x-3 2xl:space-x-4 flex flex-col lg:flex-row text-sm text-lightBlack lg:text-white dark:text-white uppercase font-normal bg-white dark:bg-normalBlack lg:bg-transparent dark:lg:bg-transparent py-3 lg:py-0 font-Nepali lg:min-h-[4rem] lg:items-center`}
          >
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative nav-item`}
              to="#"
            >
              <span className="nav-text-wrapper">
                <span className="nav-item">
                  {t('nav.about')}
                </span>
                <BiChevronDown className="ml-1 flex-shrink-0" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[250px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/about" className="py-2 block">
                        {t('submenu.about_us')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/board-of-directors" className="py-2 block">
                        {t('submenu.board_directors')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/management-team" className="py-2 block">
                        {t('submenu.management_team')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/corporate-team" className="py-2 block">
                        {t('submenu.corporate_team')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/committee" className="py-2 block">
                        {t('submenu.committee')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/organization-structure" className="py-2 block">
                        {t('submenu.organization_structure')}
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative nav-item`}
              to="#"
            >
              <span className="nav-text-wrapper">
                <span className="nav-item">
                  {t('nav.services')}
                </span>
                <BiChevronDown className="ml-1 flex-shrink-0" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[250px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/services" className="py-2 block">
                        {t('submenu.all_services')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/services/loan" className="py-2 block">
                        {t('submenu.loan_services')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/services/savings" className="py-2 block">
                        {t('submenu.savings_services')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/services/remittance" className="py-2 block">
                        {t('submenu.remittance_services')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/services/member-welfare" className="py-2 block">
                        {t('submenu.member_welfare')}
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            {/* Branches link hidden per client request */}
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative nav-item`}
              to="#"
            >
              <span className="nav-text-wrapper">
                <span className="nav-item">
                  {t('nav.reports')}
                </span>
                <BiChevronDown className="ml-1 flex-shrink-0" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[250px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports" className="block py-2">
                        {t('submenu.all_reports')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports/quarterly-report" className="block py-2">
                        {t('submenu.quarterly_report')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports/annual-report" className="block py-2">
                        {t('submenu.annual_report')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports/agm-minutes" className="block py-2">
                        {t('submenu.agm_minutes')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports/base-rate" className="block py-2">
                        {t('submenu.base_rate')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports/staff-training" className="block py-2">
                        {t('submenu.staff_training')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/reports/governance-report" className="block py-2">
                        {t('submenu.governance_report')}
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 nav-item`}
              to="/reports/notices"
            >
              <span className="nav-item">
                {t('nav.notices')}
              </span>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative nav-item`}
              to="#"
            >
              <span className="nav-text-wrapper">
                <span className="nav-item">
                  {t('nav.career')}
                </span>
                <BiChevronDown className="ml-1 flex-shrink-0" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[250px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/career/notices" className="block py-2">
                        {t('submenu.career_notices')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/career/apply" className="block py-2">
                        {t('submenu.apply_for_job')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/career/application-form" className="block py-2">
                        {t('submenu.application_form')}
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative nav-item`}
              to="#"
            >
              <span className="nav-text-wrapper">
                <span className="nav-item">
                  {t('nav.online')}
                </span>
                <BiChevronDown className="ml-1 flex-shrink-0" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[250px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/online/emi-calculator" className="block py-2">
                        {t('submenu.emi_calculator')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/online/interest-calculator" className="block py-2">
                        {t('submenu.interest_calculator')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/online/apply-for-loan" className="block py-2">
                        {t('submenu.apply_for_loan')}
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 group relative nav-item`}
              to="#"
            >
              <span className="nav-text-wrapper">
                <span className="nav-item">
                  {t('nav.gunaso')}
                </span>
                <BiChevronDown className="ml-1 flex-shrink-0" />
              </span>
              <div className="absolute pt-5 lg:pt-8 z-20">
                <ul className="shadow-2xl hidden group-hover:block rounded-sm bg-white text-black w-[250px] text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 ">
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/gunaso/register-complaint" className="block py-2">
                        {t('submenu.register_complaint')}
                      </NavLink>
                    </li>
                  </div>
                  <div className=" px-5 group hover:bg-khaki hover:text-white">
                    <li className="hover:ml-3 duration-300  ">
                      <NavLink to="/gunaso/register-complaint-nrb" className="block py-2">
                        {t('submenu.register_complaint_nrb')}
                      </NavLink>
                    </li>
                  </div>
                </ul>
              </div>
            </NavLink>
            <NavLink
              className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-lightBlack lg:text-white dark:text-white lg:border-b-0 px-3 py-2 w-full block transition-all duration-300 nav-item`}
              to="/contact"
            >
              <span className="nav-item">
                {t('nav.contact')}
              </span>
            </NavLink>
          </ul>

          {/* large device visible button and search icon */}
          <div className="hidden lg:flex items-center lg:pl-8 gap-4">
            {/* Search Bar */}
            <SearchBar />
            
            {/* Language Toggle */}
            <span onClick={toggleLanguage} className="cursor-pointer group">
              <span 
                className="language-toggle"
                title={language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
              >
                {language === 'en' ? 'NE' : 'EN'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
