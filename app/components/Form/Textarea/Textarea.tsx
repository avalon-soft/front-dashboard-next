'use client'
import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'

import './Textarea.sass'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  register: Object
  error: any
  label: string
  isFill: boolean
}

const Textarea = (props: TextareaProps) => {
  const { register, error, label, id, className, isFill, name } = props
  const container = useRef<any>()

  const { contextSafe } = useGSAP({ scope: container }) // we can pass in a config object as the 1st parameter to make scoping simple

  const handleClickOnFocus = contextSafe(() => {
    gsap.to('.textarea__label', { y: -12 })
    setTimeout(() => {
      let element = document.getElementsByTagName('com-1password-button')
      element[0]?.remove()
    }, 50)
  })

  useEffect(() => {
    isFill && handleClickOnFocus()
  }, [isFill, handleClickOnFocus])

  const handleClickOnBlur = contextSafe(() => {
    !isFill && gsap.to('.textarea__label', { y: 0 })
  })
  return (
    <div ref={container} className='textarea'>
      <label htmlFor={id} className={`textarea__label ${error ? 'opacity-0' : 'opacity-100'}`}>
        {label}
      </label>
      <textarea
        {...register}
        id={id}
        name={name}
        onFocus={handleClickOnFocus}
        onBlur={handleClickOnBlur}
        className={`${(className && className) || ''} textarea__field textarea__field${error ? '--error' : '--default'}`}
      />
      {error && <div className='textarea__error'>{error.message}</div>}
    </div>
  )
}

export default Textarea
