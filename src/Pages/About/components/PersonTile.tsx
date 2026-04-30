import React from "react";

export interface PersonProps {
  id: string | number;
  name: string;
  position: string;
  email?: string;
  phone?: string;
  image?: string;
  className?: string;
}

const PersonTile: React.FC<PersonProps> = ({
  id,
  name,
  position,
  email = "",
  phone = "",
  image = "/images/inner/member-1.jpg",
  className = "",
}) => {
  return (
    <div className={`member group overflow-hidden relative ${className}`} data-id={id}>
      <img src={image} className="w-full object-cover" alt={name} />

      {/* Name / position area — transitions to dark bg on hover so overlay blends seamlessly */}
      <div className="px-4 lg:px-8 pt-5 pb-4 bg-white dark:bg-normalBlack group-hover:bg-normalBlack transition-colors duration-500">
        <h3 className="text-lg sm:text-xl lg:text-[20px] leading-6 md:leading-7 text-lightBlack dark:text-white font-semibold font-Garamond text-center break-words whitespace-normal group-hover:text-white transition-colors duration-500">
          {name}
        </h3>
        <p className="text-sm md:text-sm leading-[22px] text-Gray dark:text-lightGray font-normal font-Lora text-center group-hover:text-white transition-colors duration-500">
          {position}
        </p>
      </div>

      {/* Contact overlay — slides up from bottom to cover the text area */}
      {(phone || email) && (
        <div className="p-6 bg-normalBlack grid items-center justify-center absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
          <div className="text-center text-white space-y-1">
            {phone && (
              <p className="text-white font-medium leading-6 text-base lg:text-lg font-Garamond">
                {phone}
              </p>
            )}
            {email && (
              <p className="text-white font-medium leading-6 text-sm lg:text-base font-Garamond break-all">
                {email}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonTile;
