import React from 'react'

function List({a,b,c,d,e,f,g,h}) {
  return (
    <div>
        <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
  <dl class="-my-3 divide-y divide-gray-100 text-sm">
    <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">{a} </dt>
      <dd class="text-gray-700 sm:col-span-2">{b}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">{c} </dt>
      <dd class="text-gray-700 sm:col-span-2">{d}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">{e} </dt>
      <dd class="text-gray-700 sm:col-span-2">{f}</dd>
    </div>

    <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
      <dt class="font-medium text-gray-900">{g} </dt>
      <dd class="text-gray-700 sm:col-span-2">{h}</dd>
    </div>

  </dl>
</div>
    </div>
  )
}

export default List