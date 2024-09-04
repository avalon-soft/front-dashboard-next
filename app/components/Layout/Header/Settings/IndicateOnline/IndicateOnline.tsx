import useOnlineStatus from '@/hooks/useOnlineStatus'
import classNames from 'classnames'
import React from 'react'
import './IndicateOnline.sass'

export const IndicateOnline = () => {
  const isOnline = useOnlineStatus()

  return (
    <div>
      <div
        className={classNames('indicateOnline', {
          'bg-success-main': isOnline,
          'bg-main-blue-gray-50': !isOnline,
        })}
      />
    </div>
  )
}
