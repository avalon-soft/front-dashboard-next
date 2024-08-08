import React from 'react'

const EyeClose = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.82281 13.3211C2.26558 12.5186 2.26558 11.4814 2.82281 10.6789C4.23146 8.65029 7.40464 5 12 5C16.5954 5 19.7685 8.65029 21.1772 10.6789C21.7344 11.4814 21.7344 12.5186 21.1772 13.3211C19.7685 15.3497 16.5954 19 12 19C7.40464 19 4.23146 15.3497 2.82281 13.3211Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75ZM8.25 12C8.25 9.92893 9.92893 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92893 15.75 8.25 14.0711 8.25 12Z'
        fill='currentColor'
      />
      <g filter='url(#filter0_d_94_8037)'>
        <path
          d='M3 3L21 21'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </g>
    </svg>
  )
}

export default EyeClose
