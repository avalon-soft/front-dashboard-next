import React from 'react'
import './Drawer.sass'
import Avatar from '../Avatar/Avatar'
import Moon from '../../../../Icons/Moon'
import Help from '../../../../Icons/Help'
import Settings from '../../../../Icons/Settings'
import Logout from '../../../../Icons/Logout'
import ThemeSwitch from '../../../../../components/ThemeSwitch'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { signOut } from './actions'
import { IUser } from '@/types'
import { redirect, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

interface DrawerProps {
  open: boolean
  user: IUser
}

const Drawer = (props: DrawerProps) => {
  const { open, user } = props
  const locale = useLocale()
  useGSAP(() => {
    if (open) {
      gsap.to('.drawer', { height: '244', padding: '4px', duration: 0.3 })
    } else {
      gsap.to('.drawer', { height: '0', padding: '0 4px', duration: 0.3 })
    }
  }, [open])
  const { push } = useRouter()
  const handleClickLogout = () => {
    signOut()
    localStorage.clear()
    push(`/${locale}/login`)
  }

  return (
    <div className='drawer dark:bg-main-gray-900'>
      <div className='drawer__container'>
        <div className='drawer__header'>
          <Avatar user={user} />
          <div className='ml-1'>
            <div className='text-caption-1 text-main-gray-900 dark:text-main-gray-50'>
              {user.name}
            </div>
            <div className='text-caption-2 text-primary-main'>
              {user.username}
            </div>
          </div>
        </div>
        <ul className='drawer__list'>
          <li className='drawer__list-item flex items-center justify-between text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50 dark:hover:bg-main-gray-700'>
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
          <li className='drawer__list-item text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50 dark:hover:bg-main-gray-700'>
            <Help
              className='mr-2 text-status-text-gray dark:text-main-gray-50'
              width={16}
              height={16}
            />
            <span>Help</span>
          </li>
          <li className='drawer__list-item text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50 dark:hover:bg-main-gray-700'>
            <Settings
              className='mr-2 text-status-text-gray dark:text-main-gray-50'
              width={16}
              height={16}
            />
            <span>Settings</span>
          </li>
          <li className='drawer__list-item text-caption-1 text-main-gray-900 hover:bg-main-gray-200 dark:text-main-gray-50 dark:hover:bg-main-gray-700'>
            <button
              onClick={() => handleClickLogout()}
              className='flex items-center'
            >
              <Logout
                className='mr-2 text-status-text-gray dark:text-main-gray-50'
                width={16}
                height={16}
              />
              <span onClick={() => handleClickLogout()}>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
