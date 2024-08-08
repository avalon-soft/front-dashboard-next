import React from 'react'

const ProgressCheck = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='progress-check'>
        <path
          id='Vector'
          d='M16.667 34.6286C15.2164 34.2995 13.8232 33.7552 12.5337 33.0136M23.3337 5.37158C26.6473 6.12837 29.6057 7.98773 31.7247 10.6453C33.8438 13.3028 34.9977 16.601 34.9977 19.9999C34.9977 23.3988 33.8438 26.6971 31.7247 29.3546C29.6057 32.0121 26.6473 33.8715 23.3337 34.6283M7.63208 28.4884C6.72292 27.1675 6.03241 25.7088 5.58708 24.1684M5.20703 17.5001C5.4737 15.9168 5.98703 14.4168 6.70703 13.0418L6.9887 12.5334M11.5124 7.63158C13.0718 6.55808 14.8212 5.79111 16.6674 5.37158M15.0003 20.0001L18.3337 23.3334L25.0003 16.6667'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default ProgressCheck
