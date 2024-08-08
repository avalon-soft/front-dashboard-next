import React from 'react'

import { IndicateOnline } from '../IndicateOnline/IndicateOnline'

import { getFirstLetter } from '@/helpers'

import './Avatar.sass'

const Avatar = () => {
  return (
    <div className='settings__avatar bg-primary-main'>
      {getFirstLetter('Settings')}
      <IndicateOnline />
    </div>
  )
}

export default Avatar
