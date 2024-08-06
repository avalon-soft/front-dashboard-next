import React from 'react'
import './Header.sass'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import Settings from './Settings/Settings'
const Header = () => {
  return (
    <div className='header dark:bg-main-gray-900'>
      <div className='header__container'>
        <Breadcrumbs />
        <>
          <Settings />
        </>
      </div>
    </div>
  )
}

export default Header
