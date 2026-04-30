import React from "react";
import { BranchData } from "../data";

interface BranchTileProps {
  branch: BranchData;
}

const BranchTile: React.FC<BranchTileProps> = ({ branch }) => {
  return (
    <div className="bg-white dark:bg-lightBlack border border-[#e8e8e8] dark:border-[#333] rounded-sm p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 h-full">
      {/* Branch SN + Name */}
      <div className="border-b border-[#e8e8e8] dark:border-[#333] pb-4">
        <span className="text-xs font-semibold text-khaki uppercase tracking-widest font-Lora">
          Branch #{branch.sn}
        </span>
        <h3 className="text-xl lg:text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mt-1 leading-tight">
          {branch.name}
        </h3>
      </div>

      {/* Location details */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 text-khaki flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="text-sm text-gray dark:text-lightGray font-Lora">
            <p className="font-medium text-lightBlack dark:text-white">{branch.district}</p>
            <p>{branch.municipality}, Ward {branch.ward}</p>
            <p>{branch.locality}</p>
          </div>
        </div>

        {/* Contact person */}
        <div className="flex items-center gap-2 mt-1">
          <svg className="w-4 h-4 text-khaki flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-sm font-medium text-lightBlack dark:text-white font-Lora">{branch.contactPerson}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-khaki flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a
            href={`tel:${branch.phone}`}
            className="text-sm text-gray dark:text-lightGray font-Lora hover:text-khaki transition-colors duration-200"
          >
            {branch.phone}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-khaki flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a
            href={`mailto:${branch.email}`}
            className="text-sm text-gray dark:text-lightGray font-Lora hover:text-khaki transition-colors duration-200 break-all"
          >
            {branch.email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BranchTile;
