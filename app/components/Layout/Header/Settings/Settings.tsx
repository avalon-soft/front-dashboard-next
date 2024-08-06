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

  const onClickGood = contextSafe(() => {
    gsap.to(container.current, { rotation: isOpenDrawer ? 0 : 180 })
    setIsOpenDrawer(!isOpenDrawer)
  })
  return (
    <div className='settings'>
      <button onClick={onClickGood} className='settings__container'>
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
