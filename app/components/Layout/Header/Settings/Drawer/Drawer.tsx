import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './Drawer.sass'
import Avatar from '../Avatar/Avatar'
import Moon from '../../../../Icons/Moon'
import Help from '../../../../Icons/Help'
import Settings from '../../../../Icons/Settings'
import Logout from '../../../../Icons/Logout'
import ThemeSwitch from '../../../../../components/ThemeSwitch'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface DrawerProps {
  open: boolean
}

const Drawer = ({ open }: DrawerProps) => {
  useGSAP(() => {
    if (open) {
      gsap.to('.drawer', { height: '244', padding: '4px', duration: 0.3 })
    } else {
      gsap.to('.drawer', { height: '0', padding: '0 4px', duration: 0.3 })
    }
  }, [open])
  return (
    <div className='drawer dark:bg-main-gray-900'>
      <div className='drawer__container'>
        <div className='drawer__header'>
          <Avatar />
          <div className='ml-1'>
            <div className='text-caption-1 text-main-gray-900 dark:text-main-gray-50'>
              Wade Warren
            </div>
            <div className='text-caption-2 text-primary-main'>
              Mailname@email.com
            </div>
          </div>
        </div>
        <ul className='drawer__list'>
          <li className='drawer__list-item dark:hover:bg-main-gray-700 flex items-center justify-between text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50'>
            <div className='flex items-center'>
              <Moon
                className='mr-2 text-status-text-gray dark:text-main-gray-50'
                width={16}
                height={16}
              />
              <span>Nigth mode</span>
            </div>
            <ThemeSwitch />
          </li>
          <li className='drawer__list-item dark:hover:bg-main-gray-700 text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50'>
            <Help
              className='mr-2 text-status-text-gray dark:text-main-gray-50'
              width={16}
              height={16}
            />
            <span>Help</span>
          </li>
          <li className='drawer__list-item dark:hover:bg-main-gray-700 text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50'>
            <Settings
              className='mr-2 text-status-text-gray dark:text-main-gray-50'
              width={16}
              height={16}
            />
            <span>Settings</span>
          </li>
          <li className='drawer__list-item dark:hover:bg-main-gray-700 text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50'>
            <Logout
              className='mr-2 text-status-text-gray dark:text-main-gray-50'
              width={16}
              height={16}
            />
            <span>Log out</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
