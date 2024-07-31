'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'
import './Input.sass'
import classNames from 'classnames'
import PreIcon from './PreIcon'

interface InputProps extends React.ComponentProps<'input'> {
  error: any
  register: Object
  label: string
  isFill: boolean
  preIcon?: string
}

export const Input = (props: InputProps) => {
  const {
    register,
    error,
    label,
    id,
    className,
    isFill,
    type,
    name,
    maxLength,
    preIcon,
    placeholder,
  } = props
  const container = useRef<any>()
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { contextSafe } = useGSAP({ scope: container })
  const handleClickOnFocus = contextSafe(() => {
    // gsap.to('.input__label', { y: -12, duration: 0.3 })
    setTimeout(() => {
      let element = document.getElementsByTagName('com-1password-button')
      element[0]?.remove()
    }, 50)
  })

  useEffect(() => {
    isFill && handleClickOnFocus()
  }, [isFill, handleClickOnFocus])

  const handleClickOnBlur = contextSafe(() => {
    // !isFill && gsap.to('.input__label', { y: 0, duration: 0.3 })
  })

  const handleClickVisiblePassword = contextSafe(() => {
    setPasswordVisible(!isPasswordVisible)
    const eyeIcon = document.getElementById('eye-icon')
    if (eyeIcon) {
      gsap.to(eyeIcon, {
        duration: 0,
        rotateY: 0,
        opacity: 0,
        onComplete: () => {
          gsap.to(eyeIcon, { duration: 0.3, rotateY: 180, opacity: 1 })
        },
      })
    }
  })

  return (
    <div ref={container} className={`input ${(className && className) || ''}`}>
      <label
        htmlFor={id}
        className={`input__label ${error ? 'opacity-0' : 'opacity-100'}`}
      >
        {label}
      </label>
      <div className={classNames('input__container', { 'input__container--error': error })}>
        {preIcon && (
          <PreIcon
            componentName={preIcon}
            className={classNames(
              'input__pre-icon',
              `input__pre-icon--${preIcon.toLowerCase()}`
            )}
          />
        )}
        <input
          {...register}
          id={id}
          name={name}
          type={isPasswordVisible ? 'text' : type}
          onFocus={handleClickOnFocus}
          onBlur={handleClickOnBlur}
          placeholder={placeholder}
          className={`input__field input__field${error ? '--error' : '--default'}`}
          maxLength={maxLength}
        />
        {type === 'password' && (
          <div
            id='eye-icon'
            onClick={handleClickVisiblePassword}
            className={`input__password input__password${!isPasswordVisible ? '--eye' : '--eye-close'}`}
          />
        )}
      </div>
      {error && <div className='input__error'>{error.message}</div>}
    </div>
  )
}

export default Input
