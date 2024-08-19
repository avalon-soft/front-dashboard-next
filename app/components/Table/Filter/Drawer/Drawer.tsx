import React from 'react'
import './Drawer.sass'
import ChevronDown from '@/app/components/Icons/ChevronDown'
import Pin from '@/app/components/Icons/Pin'
import PinOff from '@/app/components/Icons/PinOff'
import DeviceFloppy from '@/app/components/Icons/DeviceFloppy'

const Drawer = () => {
  return (
    <div className='drawer-filter'>
      <div className='drawer-filter__content'></div>
      <div className='drawer-filter__footer'>
        <button className='drawer-filter__show-additional-filter flex items-center'>
          <span className='mr-1 text-body-2'>Show additional filters</span>
          <ChevronDown width={24} height={24} />
        </button>
        <div className='flex'>
          <div className='flex gap-4'>
            <button className='rounded-sm border border-primary-main p-2'>
              <Pin width={24} height={24} className='text-primary-main' />
              {/* <PinOff width={24} height={24} className='text-primary-main' /> */}
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
            <button className='rounded-sm border border-primary-main px-5 py-2'>
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
