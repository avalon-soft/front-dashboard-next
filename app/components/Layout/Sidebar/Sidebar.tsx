'use client'
import classNames from 'classnames'
import React, { HTMLProps, useRef, useState } from 'react'
import './Sidebar.sass'
import Img from '../../Image/Image'
import Logo from '@/public/assets/logo.png'
import LogoRetina from '@/public/assets/logo@2x.png'
import ChevronLeft from '../../icons/ChevronLeft'
import { useGSAP } from '@gsap/react'
import sass from '@/app/styles/modules/variables.module.sass'
import gsap from 'gsap'

const Sidebar: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { className, ...defaultDivProps } = props
  const [isMini, setIsMini] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({ scope: container })

  const handleClickResizeSidebar = contextSafe(() => {
    const layoutSidebar = document.querySelector('.layout__sidebar')
    const button = container.current?.querySelector('.sidebar__btn')
    const buttonIcon = container.current?.querySelector('.sidebar__btn-icon')
    const logoTitle = container.current?.querySelector('.sidebar__logo-title')
    const logoLink = container.current?.querySelector('.sidebar__logo-link')
    
    if (layoutSidebar && button && buttonIcon && logoTitle && logoLink) {
      if (isMini) {
        gsap.fromTo(
          layoutSidebar,
          { width: sass.minSidebarWidth },
          { width: sass.maxSidebarWidth, duration: 0.3 }
        )
        gsap.fromTo(button, { x: 25 }, { x: 0 })
        gsap.to(buttonIcon, { rotate: 0, delay: 0.1 })
        gsap.to(logoLink, { x: 0, duration: 0.1 })
        gsap.to(logoTitle, { display: 'block', delay: 0.1 })
      } else {
        gsap.fromTo(
          layoutSidebar,
          { width: sass.maxSidebarWidth },
          { width: sass.minSidebarWidth, duration: 0.3 }
        )
        gsap.fromTo(button, { x: 0 }, { x: 25 })
        gsap.to(buttonIcon, { rotate: 180, delay: 0.1 })
        gsap.to(logoTitle, { display: 'none', duration: 0 })
        gsap.to(logoLink, { x: 12, duration: 0.1 })
      }
      setIsMini(!isMini)
    }
  })

  return (
    <div
      {...defaultDivProps}
      className={classNames('sidebar', className)}
      ref={container}
    >
      <div className='sidebar__append pb-4 pt-6'>
        <a href='/' className='sidebar__logo-link flex items-center'>
          <Img
            src={Logo}
            srcSet={[Logo, LogoRetina]}
            alt='logo'
            priority={true}
            width={24}
            height={24}
          />
          <span className='sidebar__logo-title text-primary-main text-heading-7 ml-2'>
            Logo
          </span>
        </a>
        <button className='sidebar__btn' onClick={handleClickResizeSidebar}>
          <ChevronLeft
            width={20}
            height={20}
            className='sidebar__btn-icon text-primary-main'
          />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
