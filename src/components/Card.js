import React from 'react'

function Card( {img1, img2, name,des} ) {
  return (
        <a href="#" class="group relative block  rounded-full">
  <div class="relative h-[350px] sm:h-[450px]">
    <img
      src={img1}
      alt=""
      class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
    />

    <img
      src={img2}
      alt=""
      class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
    />
  </div>

  <div class="absolute inset-0 flex flex-col items-start justify-end p-6">
    <h3 class="text-xl font-medium text-white">{name}</h3>
    <p class="mt-1.5 text-pretty text-xs text-white">
      {des}
    </p>
  </div>
</a>
  )
}

export default Card