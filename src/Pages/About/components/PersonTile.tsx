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
    <div className={`member group overflow-hidden ${className}`} data-id={id}>
      {/* Photo */}
      <img src={image} className="w-full object-cover" alt={name} />

      {/* Bottom section — overlay is scoped to this wrapper only, not the image */}
      <div className="relative overflow-hidden">
        {/* Static name + position */}
        <div className="px-4 lg:px-8 pt-5 pb-5 bg-white dark:bg-normalBlack text-center">
          <h3 className="text-lg sm:text-xl lg:text-[20px] leading-6 md:leading-7 text-lightBlack dark:text-white font-semibold font-Garamond break-words">
            {name}
          </h3>
          <p className="text-sm leading-[22px] text-Gray dark:text-lightGray font-normal font-Lora mt-1">
            {position}
          </p>
        </div>

        {/* Contact overlay — slides up from below to cover the ENTIRE text area */}
        {(phone || email) && (
          <div className="absolute inset-0 bg-normalBlack flex flex-col items-center justify-center gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-500 px-4">
            {phone && (
              <p className="text-white font-medium leading-6 text-base lg:text-lg font-Garamond text-center">
                {phone}
              </p>
            )}
            {email && (
              <p className="text-white font-medium leading-5 text-sm font-Garamond text-center break-all">
                {email}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonTile;
