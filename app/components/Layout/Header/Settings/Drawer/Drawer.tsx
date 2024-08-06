import React from 'react'
import './Drawer.sass'
import Avatar from '../Avatar/Avatar'
import Moon from '@/app/components/icons/Moon'
import Help from '@/app/components/icons/Help'
import Settings from '@/app/components/icons/Settings'
import Logout from '@/app/components/icons/Logout'
import ThemeSwitch from '@/app/components/ThemeSwitch'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const Drawer = ({ open }: { open: boolean }) => {
  useGSAP(() => {
    if(open) {
      gsap.to('.drawer', { height: '224', padding: '4px', duration: 0.3 })
    } else {gsap.to('.drawer', { height: '0', padding: '0 4px', duration: 0.3 })}
  }, [open])
  return (
    <div className='drawer dark:bg-main-gray-900'>
      <div className='drawer__container'>
        <div className='drawer__header'>
          <Avatar />
          <div className='ml-1'>
            <div className='text-main-gray-900 dark:text-main-gray-50 text-caption-1'>
              Wade Warren
            </div>
            <div className='text-primary-main text-caption-2'>
              Mailname@email.com
            </div>
          </div>
        </div>
        <ul className='drawer__list'>
          <li className='drawer__list-item hover:bg-main-gray-200 dark:hover:bg-main-gray-400 text-caption-1 text-main-gray-900 dark:text-main-gray-50 flex items-center justify-between'>
            <div className='flex items-center'>
              <Moon
                className='text-status-text-gray dark:text-main-gray-50 mr-2'
                width={16}
                height={16}
              />
              <span>Nigth mode</span>
            </div>
            <ThemeSwitch />
          </li>
          <li className='drawer__list-item hover:bg-main-gray-200 dark:hover:bg-main-gray-400 text-caption-1 text-main-gray-900 dark:text-main-gray-50'>
            <Help
              className='text-status-text-gray dark:text-main-gray-50 mr-2'
              width={16}
              height={16}
            />
            <span>Help</span>
          </li>
          <li className='drawer__list-item hover:bg-main-gray-200 dark:hover:bg-main-gray-400 text-caption-1 text-main-gray-900 dark:text-main-gray-50'>
            <Settings
              className='text-status-text-gray dark:text-main-gray-50 mr-2'
              width={16}
              height={16}
            />
            <span>Settings</span>
          </li>
          <li className='drawer__list-item hover:bg-main-gray-200 dark:hover:bg-main-gray-400 text-caption-1 text-main-gray-900 dark:text-main-gray-50'>
            <Logout
              className='text-status-text-gray dark:text-main-gray-50 mr-2'
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
