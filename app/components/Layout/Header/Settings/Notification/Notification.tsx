import React from 'react'
import './Notification.sass'
import Bell from '@/app/components/icons/Bell'

interface NotificationProps {
  icon?: boolean
}

const Icon = () => {
  return (
    <div className='notification cursor-pointer'>
      <Bell width={24} height={24} className='dark:text-main-gray-50' />
      <span className='notification__badge text-main-gray-50 dark:text-main-gray-900 text-body-3'>
        9
      </span>
    </div>
  )
}

const Notification = (props: NotificationProps) => {
  const { icon } = props

  if (icon) return <Icon />

  return <div>Notification</div>
}

export default Notification
