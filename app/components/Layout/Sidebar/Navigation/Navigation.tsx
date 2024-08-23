import React, { useEffect, useState } from 'react'
import './Navigation.sass'
import ListGroup from './ListGroup/ListGroup'
import { useLocale } from 'next-intl'
import { navigationList } from '@/configs/constants'
import { INavigation } from '@/types'

const Navigation = ({ isMini }: { isMini: boolean }) => {
  const locale = useLocale()
  const [navList, setNavList] = useState<INavigation[]>([])
  useEffect(() => {
    let list = navigationList(locale)
    setNavList(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <nav>
      <ListGroup title='Section' isMini={isMini} items={navList} />
    </nav>
  )
}

export default Navigation
