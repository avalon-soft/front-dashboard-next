'use client'

import React, { useRef, useState } from 'react'
import './Settings.sass'
import ChevronDown from '@/app/components/icons/ChevronDown'
import Avatar from './Avatar/Avatar'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Drawer from './Drawer/Drawer'

const Settings = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const container = useRef<any>()
  const { contextSafe } = useGSAP({ scope: container })
  useGSAP(() => {
    // gsap.set('.drawer', { height: 0})
  })
  const onClickGood = contextSafe(() => {
    gsap.to('.settings__icon', { rotation: isOpenDrawer ? 180 : 0 })
    setIsOpenDrawer(!isOpenDrawer)
  })
  return (
    <div className='settings'>
      <button
        onClick={onClickGood}
        className='settings__container'
        ref={container}
      >
        <Avatar />
        <ChevronDown
          width={16}
          height={16}
          className={classNames('text-status-text-gray dark:text-main-gray-50 settings__icon')}
        />
      </button>
      <Drawer />
    </div>
  )
}

export default Settings
