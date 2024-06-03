import React from 'react';

function SimpleCard2({ img, name, des, wifiStatusMessage, img2 }) {
  // Determine the image source based on the wifiStatusMessage
  const getImageSrc = () => {
    if ((wifiStatusMessage === "Pet is away") || (wifiStatusMessage > 25))  {
      // Return the alternate image source if the pet is away
      return img2;
    }
    // Return the default image source otherwise
    return img;
  };

  return (
    <a href="#" className="group relative block rounded-full">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={getImageSrc()}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
        <h3 className="text-xl font-medium text-white">{name}</h3>
        <p className="mt-1.5 text-pretty text-xs text-white">{des}</p>
      </div>
    </a>
  );
}

export default SimpleCard2;
