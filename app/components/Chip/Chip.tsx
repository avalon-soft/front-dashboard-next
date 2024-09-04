import React, { forwardRef, HTMLProps } from 'react'
import Close from '../Icons/Close'
import classNames from 'classnames'

interface ChipProps extends HTMLProps<HTMLDivElement> {
  label: string
  close: () => void
}

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { label, close, className, ...defaultProps } = props
  return (
    <div
      ref={ref}
      {...defaultProps}
      className={classNames('flex items-center px-2 py-1', className)}
    >
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
})
Chip.displayName = 'Chip'
export default Chip
