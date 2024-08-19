import React from 'react'

const PinOff = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='pinned-off'>
        <path
          id='Vector'
          d='M3 3L21 21M15 4.5L11.751 7.749M9.181 9.182L7 10L5.5 11.5L12.5 18.5L14 17L14.82 14.814M16.25 12.251L19.5 9M9 15L4.5 19.5M14.5 4L20 9.5'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default PinOff
