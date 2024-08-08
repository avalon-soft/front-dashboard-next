import useOnlineStatus from '@/helpers/useOnlineStatus'
import classNames from 'classnames'
import React from 'react'
import './IndicateOnline.sass'

export const IndicateOnline = () => {
  const isOnline = useOnlineStatus()

  return (
    <div
      className={classNames('indicateOnline', {
        'bg-success-main': isOnline,
        'bg-main-blue-gray-50': !isOnline,
      })}
    />
  )
}
