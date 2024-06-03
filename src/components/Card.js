import React, { useState, useEffect } from 'react';

function Card({ img1, img2, name, des }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Function to set image source based on the name prop
    const setImageBasedOnName = () => {
      switch (name) {
        case 'Cat is Moving around':
          setImageSrc(img1);
          break;
        case 'Cat is Resting':
          setImageSrc(img2);
          break;
        default:
          setImageSrc('default-pic.jpg'); // You can set a default image if needed
          break;
      }
    };

    // Call the function to set image source
    setImageBasedOnName();
  }, [name, img1, img2]); // Run effect whenever name, img1 or img2 changes

  return (
    <a href="#" className="group relative block rounded-full">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={imageSrc}
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

export default Card;
