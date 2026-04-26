import React from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import ServiceCard from "../Services/components/ServiceCard";
import ServiceHeader from "../Services/components/ServiceHeader";
import { ServiceCardProps, ServiceCategory } from "../Services/types";

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  // Service data for the 4 financial services
  // This will later be replaced with data from Strapi CMS
  const servicesData: ServiceCardProps[] = [
    {
      id: "1",
      title: "Loan Services",
      category: "FINANCIAL",
      description: "Comprehensive loan products designed to meet your financial needs. From personal loans to business financing, we offer competitive rates and flexible terms to help you achieve your goals.",
      imageUrl: "/images/home-1/facilities-1.png",
      linkTo: "/services/loan",
      orderNumber: "1"
    },
    {
      id: "2", 
      title: "Savings Services",
      category: "FINANCIAL",
      description: "Build your financial future with our diverse savings products. Enjoy attractive interest rates and secure your money while it grows with our trusted savings accounts and deposit schemes.",
      imageUrl: "/images/home-1/facilities-thumb-2.jpg",
      linkTo: "/services/savings", 
      orderNumber: "2"
    },
    {
      id: "3",
      title: "Remittance Services", 
      category: "FINANCIAL",
      description: "Fast, secure, and reliable money transfer services. Send and receive money domestically and internationally with competitive exchange rates and minimal processing time.",
      imageUrl: "/images/home-1/facilities-thumb-3.jpg",
      linkTo: "/services/remittance",
      orderNumber: "3"
    },
    {
      id: "4",
      title: "Member Welfare Services",
      category: "SOCIAL",
      description: "Supporting our members beyond banking with comprehensive welfare programs including training, healthcare assistance, and emergency support for improved quality of life.",
      imageUrl: "/images/home-1/facilities-thumb-4.jpg", 
      linkTo: "/services/member-welfare",
      orderNumber: "4"
    }
  ];

  return (
    <section className="">
      <BreadCrumb title={t('page.services')} />

      {/* service page content */}
      <div className="dark:bg-mediumBlack">
        <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
          
          {/* Service page header */}
          <ServiceHeader 
            title="OUR COMPREHENSIVE FINANCIAL SERVICES"
            subtitle="SERVICES"
            buttonText="Contact Us"
            buttonLink="/contact"
          />
          
          {/* Services container */}
          <div className="">
            {servicesData.map((service, index) => (
              <div key={service.id}>
                {/* Horizontal divider between services */}
                <hr className="text-[#e8e8e8] dark:text-[#383838] my-10" />
                
                {/* Service card component */}
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  category={service.category}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  linkTo={service.linkTo}
                  orderNumber={service.orderNumber}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Services;
