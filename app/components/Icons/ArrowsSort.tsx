import React from 'react'

const ArrowsSort = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='arrows-sort'>
        <path
          id='Vector'
          d='M2 5.99998L4.66667 3.33331M4.66667 3.33331L7.33333 5.99998M4.66667 3.33331V12.6666M14 9.99998L11.3333 12.6666M11.3333 12.6666L8.66667 9.99998M11.3333 12.6666V3.33331'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default ArrowsSort
