import React, { HTMLProps } from 'react'
import Close from '../Icons/Close'

interface ChipProps extends HTMLProps<HTMLDivElement> {
  label: string
  close: () => void
}

const Chip = (props: ChipProps) => {
  const { label, close } = props
  return (
    <div className='flex items-center px-2 py-1'>
      <label className='text-caption-1 text-primary-main'>{label}</label>
      <button onClick={close} className='ml-1'>
        <Close
          width={16}
          height={16}
          className='text-primary-main hover:text-primary-hover'
        />
      </button>
    </div>
  )
}

export default Chip
