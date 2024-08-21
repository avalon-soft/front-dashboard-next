'use client'

import React, { useEffect, useRef, useState } from 'react'
import './Settings.sass'
import ChevronDown from '../../../Icons/ChevronDown'
import Avatar from './Avatar/Avatar'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Drawer from './Drawer/Drawer'
import Support from '../../../Icons/Support'
import Notification from './Notification/Notification'
import Search from './Search/Search'
import useClickOutside from '@/helpers/useOnClickOutside'
import { endpoints } from '@/api/endpoints'
import { api } from '@/api'

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

  const drawer = React.createRef<HTMLDivElement>()
  useClickOutside(drawer, () => {
    setIsOpenDrawer(false)
  })

  const { base } = endpoints

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const loadData = async () => {
    const response = await api.get(base + '/auth/me')
    console.log('response :>> ', response)
  }
  return (
    <div className='settings'>
      <Search />
      <div className='ml-4 cursor-pointer'>
        <Support width={24} height={24} className='dark:text-main-gray-50' />
      </div>
      <div className='ml-4'>
        <Notification icon />
      </div>
      <div ref={drawer}>
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
                'settings__icon text-status-text-gray dark:text-main-gray-50'
              )}
            />
          </div>
        </button>
        <Drawer open={isOpenDrawer} />
      </div>
    </div>
  )
}

export default Settings
