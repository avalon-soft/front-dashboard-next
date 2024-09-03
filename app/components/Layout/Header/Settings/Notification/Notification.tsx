import React from 'react'
import './Notification.sass'
import Bell from '../../../../Icons/Bell'
import Badge from '../../../../../components/Badge/Badge'

interface NotificationProps {
  icon?: boolean
}

const Icon = () => {
  return (
    <div className='notification cursor-pointer'>
      <Bell width={24} height={24} className='dark:text-main-gray-50' />
      <Badge className='notification__badge' count='9' />
    </div>
  )
}

const Notification = (props: NotificationProps) => {
  const { icon } = props

  if (icon) return <Icon />

  return <div>Notification</div>
}

export default Notification
