import React from 'react'

const Loader = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='loader'>
        <path
          id='Vector'
          d='M8 4V2M10.8333 5.16673L12.2667 3.7334M12 8H14M10.8333 10.8333L12.2667 12.2667M8 12V14M5.16673 10.8333L3.7334 12.2667M4 8H2M5.16673 5.16673L3.7334 3.7334'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default Loader
