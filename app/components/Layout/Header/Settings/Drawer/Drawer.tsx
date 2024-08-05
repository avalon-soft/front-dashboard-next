import React from 'react'
import './Drawer.sass'
import Avatar from '../Avatar/Avatar'
import Moon from '@/app/components/icons/Moon'
import Help from '@/app/components/icons/Help'
import Settings from '@/app/components/icons/Settings'
import Logout from '@/app/components/icons/Logout'
import ToggleSwitch from '@/app/components/Form/ToggleSwitch/ToggleSwitch'
const Drawer = () => {
  return (
    <div className='drawer'>
      <div className='drawer__container'>
        <div className='drawer__header'>
          <Avatar />
          <div className='ml-1'>
            <div className='text-main-gray-900 text-caption-1'>Wade Warren</div>
            <div className='text-primary-main text-caption-2'>
              Mailname@email.com
            </div>
          </div>
        </div>
        <ul className='drawer__list'>
          <li className='drawer__list-item hover:bg-main-gray-200 text-caption-1 text-main-gray-900 flex items-center justify-between'>
            <div className='flex items-center'>
              <Moon
                className='text-status-text-gray mr-2'
                width={16}
                height={16}
              />
              <span>Nigth mode</span>
            </div>
            <ToggleSwitch />
          </li>
          <li className='drawer__list-item hover:bg-main-gray-200 text-caption-1 text-main-gray-900'>
            <Help
              className='text-status-text-gray mr-2'
              width={16}
              height={16}
            />
            <span>Help</span>
          </li>
          <li className='drawer__list-item hover:bg-main-gray-200 text-caption-1 text-main-gray-900'>
            <Settings
              className='text-status-text-gray mr-2'
              width={16}
              height={16}
            />
            <span>Settings</span>
          </li>
          <li className='drawer__list-item hover:bg-main-gray-200 text-caption-1 text-main-gray-900'>
            <Logout
              className='text-status-text-gray mr-2'
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
