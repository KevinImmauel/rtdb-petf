import React from 'react';

function SimpleCard({ img, name, des }) {
  return (
    <a href="#" className="group relative block rounded-full">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src={img}
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

export default SimpleCard;
