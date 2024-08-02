import React from 'react'

const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='chevron-left'>
        <path
          id='Vector'
          d='M15.5 6L9.5 12L15.5 18'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default ChevronLeft
