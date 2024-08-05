import Header from '@/app/components/Layout/Header/Header'
import React from 'react'
import './layout.sass'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='layout'>
      <Header />
      {children}
    </main>
  )
}

export default Layout
