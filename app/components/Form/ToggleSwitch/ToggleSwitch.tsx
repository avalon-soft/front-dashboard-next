import React, { InputHTMLAttributes } from 'react'
import './ToggleSwitch.sass'
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
const ToggleSwitch: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div className='toggle-switch'>
      <input
        type='checkbox'
        className='toggle-switch-checkbox'
        name='toggleSwitch'
        id='toggleSwitch'
        {...props}
      />
      <label className='toggle-switch-label' htmlFor='toggleSwitch'>
        <span className='toggle-switch-inner' />
        <span className='toggle-switch-switch' />
      </label>
    </div>
  )
}

export default ToggleSwitch
