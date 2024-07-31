import React, { InputHTMLAttributes } from 'react'
import './Checkbox.sass'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div className='checkbox'>
      <input
        id='checkbox'
        type='checkbox'
        {...props}
        className='checkbox__input'
      />
      <label htmlFor='checkbox' className='checkbox__label text-body-2'>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
