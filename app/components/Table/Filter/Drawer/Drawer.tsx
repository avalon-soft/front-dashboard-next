import React, { HTMLProps, useRef, useState } from 'react'
import './Drawer.sass'
import ChevronDown from '@/app/components/Icons/ChevronDown'
import Pin from '@/app/components/Icons/Pin'
import PinOff from '@/app/components/Icons/PinOff'
import DeviceFloppy from '@/app/components/Icons/DeviceFloppy'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Drawer = (props: HTMLProps<HTMLDivElement>) => {
  const { className, ...defaultProps } = props
  const [isPin, setIsPin] = useState(false)
  const container = useRef<HTMLButtonElement>(null)
  const { contextSafe } = useGSAP({ scope: container })
  const handleClickIsPin = contextSafe(() => {
    if (!isPin) {
      gsap.to('.drawer-filter__icon--pin', { opacity: 0 })
      gsap.to('.drawer-filter__icon--pin-off', { opacity: 1 })
    } else {
      gsap.to('.drawer-filter__icon--pin', { opacity: 1 })
      gsap.to('.drawer-filter__icon--pin-off', { opacity: 0 })
    }

    setIsPin(!isPin)
  })
  return (
    <div
      {...defaultProps}
      className={classNames('drawer-filter dark:bg-main-gray-700', className)}
    >
      <div className='drawer-filter__content'></div>
      <div className='drawer-filter__footer'>
        <button className='drawer-filter__show-additional-filter flex items-center'>
          <span className='mr-1 text-body-2'>Show additional filters</span>
          <ChevronDown width={24} height={24} />
        </button>
        <div className='flex'>
          <div className='flex gap-4'>
            <button
              className={classNames(
                'drawer-filter__button rounded-sm border p-2',
                {
                  'border-error-main': isPin,
                  'border-primary-main': !isPin,
                }
              )}
              ref={container}
              onClick={() => handleClickIsPin()}
            >
              <Pin
                width={24}
                height={24}
                className='drawer-filter__icon drawer-filter__icon--pin text-primary-main dark:text-main-gray-50'
              />
              <PinOff
                width={24}
                height={24}
                className='drawer-filter__icon drawer-filter__icon--pin-off text-error-main'
              />
            </button>
            <button className='rounded-sm bg-primary-main p-2'>
              <DeviceFloppy
                width={24}
                height={24}
                className='text-main-gray-50'
              />
            </button>
          </div>
          <div className='mx-4 divide-y-2 border border-main-gray-200' />
          <div className='flex gap-4'>
            <button className='rounded-sm border border-primary-main px-5 py-2 text-primary-main dark:text-main-gray-50'>
              Clear all
            </button>
            <button className='rounded-sm bg-primary-main px-8 py-2 text-main-gray-50'>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drawer
