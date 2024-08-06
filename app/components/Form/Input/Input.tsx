'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'
import './Input.sass'
import classNames from 'classnames'
import PreIcon from './PreIcon'
import Eye from '../../icons/Eye'
import EyeClose from '../../icons/EyeClose'

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

  const container = useRef<any>(undefined)
  const eyeRef = useRef<any>(undefined)
  const eyeCloseRef = useRef<any>()

  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { contextSafe } = useGSAP({ scope: container })

  useGSAP(() => {
    // console.log('eyeRef :>> ', eyeRef.current)
    // console.log('eyeRef :>> ', eyeCloseRef.current)
    // if (isPasswordVisible) {
    //     gsap.to(eyeRef.current, {
    //       duration: 0.3,
    //       rotateY: 180,
    //       opacity: 0,
    //     })
    //     gsap.to(eyeCloseRef.current, {
    //       duration: 0.3,
    //       rotateY: 0,
    //       opacity: 1,
    //     })
    //   } else {
    //     gsap.to(eyeRef, {
    //       duration: 0.3,
    //       rotateY: 0,
    //       opacity: 1,
    //     })
    //     gsap.to(eyeCloseRef, {
    //       duration: 0.3,
    //       rotateY: 180,
    //       opacity: 0,
    //     })
    // }
  }, [isPasswordVisible])
  const handleClickOnFocus = contextSafe(() => {
    setTimeout(() => {
      let element = document.getElementsByTagName('com-1password-button')
      element[0]?.remove()
    }, 50)
  })
  useEffect(() => {
    isFill && handleClickOnFocus()
  }, [isFill, handleClickOnFocus])

  const handleClickOnBlur = contextSafe(() => {})

  const handleClickVisiblePassword = contextSafe((context: any) => {
    if (isPasswordVisible) {
      gsap.to(eyeRef.current, {
        duration: 0.3,
        rotateY: 180,
        opacity: 0,
      })
      gsap.to(eyeCloseRef.current, {
        duration: 0.3,
        rotateY: 0,
        opacity: 1,
      })
    } else {
      gsap.to(eyeRef.current, {
        duration: 0.3,
        rotateY: 0,
        opacity: 1,
      })
      gsap.to(eyeCloseRef.current, {
        duration: 0.3,
        rotateY: 180,
        opacity: 0,
      })
    }
    setPasswordVisible(!isPasswordVisible)
  })

  return (
    <div ref={container} className={`input ${(className && className) || ''}`}>
      <label
        htmlFor={id}
        className={`input__label ${error ? 'opacity-0' : 'opacity-100'}`}
      >
        {label}
      </label>
      <div
        className={classNames('input__container dark:border-main-gray-50', {
          'input__container--error': error,
        })}
      >
        {preIcon && (
          <PreIcon
            componentName={preIcon}
            className={classNames(
              'input__pre-icon dark:text-main-gray-50',
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
          className={`input__field dark:text-main-gray-50 input__field${error ? '--error' : '--default'}`}
          maxLength={maxLength}
        />
        {type === 'password' && (
          <>
            <div ref={eyeRef} className='input__password'>
              <Eye
                id='eye-icon'
                width={24}
                height={24}
                className={classNames('input__password-eye cursor-pointer')}
                onClick={handleClickVisiblePassword}
              />
            </div>
            <div ref={eyeCloseRef} className='input__password'>
              <EyeClose
                id='eye-close-icon'
                width={24}
                height={24}
                className={classNames(
                  'input__password-eye-close cursor-pointer'
                )}
                onClick={handleClickVisiblePassword}
              />
            </div>
          </>
        )}
      </div>
      {error && <div className='input__error'>{error.message}</div>}
    </div>
  )
}

export default Input
