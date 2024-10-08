'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'
import './Input.sass'
import classNames from 'classnames'
import PrependInnerIcon from './InnerIcon'
import AppendInnerIcon from './InnerIcon'
import Eye from '../../Icons/Eye'
import EyeClose from '../../Icons/EyeClose'
import { ListOfCurrencies } from '@/configs/constants'
import Select from '../Select/Select'
import {
  ControlProps,
  DropdownIndicatorProps,
  MenuListProps,
  MenuProps,
  OptionProps,
  SingleValueProps,
  ValueContainerProps,
  components,
} from 'react-select'
import Chevron from '../../Icons/ChevronDown'

interface InputProps extends React.ComponentProps<'input'> {
  error?: any
  register?: Object
  label: string
  isFill: boolean
  prependInnerIcon?: string
  appendInnerIcon?: string
  colorIcon?: string
  propsAppendIconButton?: React.ButtonHTMLAttributes<HTMLButtonElement>
  wallet?: boolean
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
    prependInnerIcon,
    placeholder,
    appendInnerIcon,
    colorIcon,
    propsAppendIconButton,
    wallet,
  } = props
  const container = useRef<any>(undefined)
  const eyeRef = useRef<any>(undefined)
  const eyeCloseRef = useRef<any>()

  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { contextSafe } = useGSAP({ scope: container })
  const [optionValue, setOptionValue] = useState<any>()
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

  const Option = (props: OptionProps) => {
    const { label, value } = props.data as { label: string; value: string }
    return (
      <div
        ref={props.innerRef}
        {...props.innerProps}
        className={classNames(
          'group cursor-pointer p-2 transition-all hover:bg-primary-focus',
          { 'bg-primary-focus': props.isSelected }
        )}
      >
        <span
          className={classNames(
            'pr-2 text-caption-1 text-main-gray-400 group-hover:text-primary-main dark:text-main-gray-50',
            {
              'text-primary-main': props.isSelected,
            }
          )}
        >
          {label}
        </span>
        <span
          className={classNames(
            'text-caption-1 text-main-gray-900 group-hover:text-primary-main dark:text-main-gray-200',
            {
              'text-primary-main': props.isSelected,
            }
          )}
        >
          {value}
        </span>
      </div>
    )
  }

  const Menu = (props: MenuProps) => {
    return (
      <div
        {...props.innerProps}
        className='absolute -right-[10px] top-[50px] mt-1 w-full min-w-[calc(100vh_-_52px)] rounded bg-main-gray-50'
        style={{
          boxShadow:
            '101px 101px 40px 0px rgba(167, 174, 192, 0.00), 64px 64px 36px 0px rgba(167, 174, 192, 0.02), 36px 36px 31px 0px rgba(167, 174, 192, 0.06), 16px 16px 23px 0px rgba(167, 174, 192, 0.10), 4px 4px 13px 0px rgba(167, 174, 192, 0.12), 0px 0px 0px 0px rgba(167, 174, 192, 0.12)',
        }}
      >
        {props.children}
      </div>
    )
  }
  const Control = ({ children, ...props }: ControlProps) => (
    <div {...props.innerProps} className='flex items-center'>
      {children}
    </div>
  )
  const SingleValue = ({ children, ...props }: SingleValueProps) => (
    <div
      {...props.innerProps}
      className={classNames({
        'text-error-main': Boolean(error),
      })}
    >
      {children}
    </div>
    // <components.SingleValue {...props}></components.SingleValue>
  )
  const ValueContainer = (props: ValueContainerProps) => {
    return (
      <div {...props.innerProps} className='flex items-center'>
        {props.children}
      </div>
    )
  }
  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    console.log('DropdownIndicator :>> ', props)
    return (
      <div {...props.innerProps}>
        <Chevron
          width={24}
          height={24}
          className={classNames('rotate-180', {
            'text-error-main': Boolean(error),
            'rotate-0': props.isFocused,
          })}
        />
      </div>
    )
  }

  const handleClickVisiblePassword = contextSafe(() => {
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
        className={`input__label ${error ? 'text-error-main' : 'text-main-gray-900'}`}
      >
        {label}
      </label>
      <div
        className={classNames('input__container dark:border-main-gray-50', {
          'input__container--error': error,
        })}
      >
        {(prependInnerIcon || optionValue?.label) && (
          <PrependInnerIcon
            componentName={prependInnerIcon || (optionValue?.label as string)}
            className={classNames(
              'input__pre-icon dark:text-main-gray-50',
              `input__pre-icon--${(prependInnerIcon || (optionValue?.label as string)).toLowerCase()}`
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
          className={classNames(
            `input__field dark:text-main-gray-50 input__field${error ? '--error' : '--default'}`
          )}
          maxLength={maxLength}
        />
        {wallet && (
          <Select
            isSearchable={false}
            classNamePrefix={'input__wallet-select'}
            options={ListOfCurrencies}
            value={optionValue}
            defaultValue={ListOfCurrencies[0]}
            onChange={setOptionValue}
            components={{
              Option,
              Menu,
              SingleValue,
              Control,
              DropdownIndicator,
              ValueContainer,
            }}
          />
        )}
        {appendInnerIcon && (
          <button {...propsAppendIconButton}>
            <AppendInnerIcon
              width={24}
              heigth={24}
              componentName={appendInnerIcon}
              className={classNames('cursor-pointer dark:text-main-gray-50', {
                [`${colorIcon}`]: colorIcon,
              })}
            />
          </button>
        )}
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
