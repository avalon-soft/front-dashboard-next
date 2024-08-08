import React from 'react'

const Moon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='moon'>
        <path
          id='Vector'
          d='M8.00002 1.99996C8.08802 1.99996 8.17535 1.99996 8.26202 1.99996C7.40558 2.79577 6.85508 3.86653 6.70621 5.02611C6.55734 6.18569 6.81952 7.36078 7.44717 8.34712C8.07483 9.33345 9.02826 10.0687 10.1418 10.4249C11.2552 10.7812 12.4584 10.7361 13.542 10.2973C13.1252 11.3003 12.4439 12.1713 11.5708 12.8175C10.6977 13.4636 9.66565 13.8607 8.58462 13.9662C7.5036 14.0718 6.41419 13.8819 5.43261 13.4169C4.45103 12.9519 3.61409 12.2291 3.01108 11.3257C2.40806 10.4223 2.06158 9.37215 2.00861 8.28728C1.95563 7.2024 2.19814 6.12349 2.71026 5.16564C3.22239 4.20778 3.98492 3.40691 4.91653 2.84845C5.84813 2.28999 6.91385 1.99489 8.00002 1.99463V1.99996Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default Moon
