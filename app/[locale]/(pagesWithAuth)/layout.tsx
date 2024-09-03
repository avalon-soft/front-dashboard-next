import Header from '@/app/components/Layout/Header/Header'
import React from 'react'
import Sidebar from '@/app/components/Layout/Sidebar/Sidebar'
import './layout.sass'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='layout'>
      <Sidebar className='layout__sidebar' />
      <div className='layout__content'>
        <Header />
        <main className='layout__main'>{children}</main>
      </div>
    </div>
  )
}

export default Layout
