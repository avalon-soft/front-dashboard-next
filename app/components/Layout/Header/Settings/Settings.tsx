'use client'

import React, { useRef, useState } from 'react'
import './Settings.sass'
import ChevronDown from '../../../../components/icons/ChevronDown'
import Avatar from './Avatar/Avatar'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Drawer from './Drawer/Drawer'
import Support from '../../../..//components/icons/Support'
import Notification from './Notification/Notification'
import Search from './Search/Search'

const Settings = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const container = useRef<any>()

  const { contextSafe } = useGSAP({ scope: container })

  const handleClickOpenDrawer = contextSafe(() => {
    gsap.to(container.current, {
      rotation: isOpenDrawer ? 0 : 180,
      duration: 0.3,
    })
    setIsOpenDrawer(!isOpenDrawer)
  })
  return (
    <div className='settings'>
      <Search />
      <div className='ml-4 cursor-pointer'>
        <Support width={24} height={24} className='dark:text-main-gray-50' />
      </div>
      <div className='ml-4'>
        <Notification icon />
      </div>
      <button
        onClick={handleClickOpenDrawer}
        className='settings__container ml-6'
      >
        <Avatar />
        <div ref={container}>
          <ChevronDown
            width={16}
            height={16}
            className={classNames(
              'text-status-text-gray dark:text-main-gray-50 settings__icon'
            )}
          />
        </div>
      </button>
      <Drawer open={isOpenDrawer} />
    </div>
  )
}

export default Settings
