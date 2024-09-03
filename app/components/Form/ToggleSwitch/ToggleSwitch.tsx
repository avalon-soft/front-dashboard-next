'use client'
import React, { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'
import './ToggleSwitch.sass'
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  onChange: Dispatch<SetStateAction<any>>
}
const ToggleSwitch: React.FC<CheckboxProps> = ({ ...props }) => {
  const { onChange } = props
  return (
    <div className='toggle-switch'>
      <input
        id='toggle-switch'
        type='checkbox'
        className='toggle-switch__input'
        {...props}
      />
      <span className='toggle-switch__slider round' onClick={onChange} />
    </div>
  )
}

export default ToggleSwitch
