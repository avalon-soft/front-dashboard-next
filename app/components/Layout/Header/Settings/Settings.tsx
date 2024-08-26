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
import { RESPONSE_SUCCESS_STATUS } from '@/configs/constants'
import { IUser } from '@/types'

const Settings = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const [user, setUser] = useState<IUser>({} as IUser)

  const { base, auth } = endpoints

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const loadData = async () => {
    const { data, status } = await api.get(base + auth.base + auth.me)
    if (RESPONSE_SUCCESS_STATUS.includes(status)) setUser(data)
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
          <Avatar user={user} />
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
        <Drawer open={isOpenDrawer} user={user} />
      </div>
    </div>
  )
}

export default Settings
