import React from 'react'

import { IndicateOnline } from '../IndicateOnline/IndicateOnline'

import { getFirstLetter } from '@/helpers'

import './Avatar.sass'
import { IUser } from '@/types'

interface AvatarPropps {
  user: IUser
}

const Avatar = (props: AvatarPropps) => {
  const { user } = props
  return (
    <div className='settings__avatar bg-primary-main'>
      {getFirstLetter(user.name)}
      <IndicateOnline />
    </div>
  )
}

export default Avatar
