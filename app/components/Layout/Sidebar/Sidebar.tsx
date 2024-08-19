'use client'
import classNames from 'classnames'
import React, { useEffect, HTMLProps, useRef, useState } from 'react'
import './Sidebar.sass'
import Img from '../../Image/Image'
import Logo from '@/public/assets/logo.png'
import LogoRetina from '@/public/assets/logo@2x.png'
import ChevronLeft from '../../Icons/ChevronLeft'
import { useGSAP } from '@gsap/react'
import sass from '@/app/styles/modules/variables.module.sass'
import gsap from 'gsap'
import Navigation from './Navigation/Navigation'
import { useMediaQuery } from 'react-responsive'

const Sidebar: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { className, ...defaultDivProps } = props
  const [isMini, setIsMini] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  const isTable = useMediaQuery({ maxWidth: 1024 })

  const { contextSafe } = useGSAP({ scope: container })
  useEffect(() => {
    if (isTable && !isMini) handleClickResizeSidebar()
    else if (!isTable && isMini) handleClickResizeSidebar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTable])
  const handleClickResizeSidebar = contextSafe(() => {
    const button = container.current?.querySelector('.sidebar__btn')
    const buttonIcon = container.current?.querySelector('.sidebar__btn-icon')
    const logoTitle = container.current?.querySelector('.sidebar__logo-title')
    const logoLink = container.current?.querySelector('.sidebar__logo-link')
    const layoutSidebar = document.querySelector('.layout__sidebar')
    const layoutContent = document.querySelector('.layout__content')

    if (layoutSidebar && button && buttonIcon && logoTitle && logoLink) {
      if (isMini) {
        gsap.fromTo(
          layoutSidebar,
          { width: sass.minSidebarWidth },
          { width: sass.maxSidebarWidth, duration: 0.3 }
        )
        gsap.fromTo(
          layoutContent,
          { width: `calc(100% - ${sass.minSidebarWidth})` },
          { width: `calc(100% - ${sass.maxSidebarWidth})` }
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
        gsap.set(layoutContent, {
          width: `calc(100% - ${sass.maxSidebarWidth})`,
        })
        gsap.fromTo(
          layoutContent,
          { width: `calc(100% - ${sass.maxSidebarWidth})` },
          { width: `calc(100% - ${sass.minSidebarWidth})` }
        )
        gsap.fromTo(button, { x: 0 }, { x: 25 })
        gsap.to(buttonIcon, { rotate: 180, delay: 0.1 })
        gsap.to(logoTitle, { display: 'none', duration: 0 })
        gsap.to(logoLink, { x: 12, duration: 0.1 })
      }
      animationItemList()
      setIsMini(!isMini)
    }
  })

  const animationItemList = () => {
    const layoutSidebar = document.querySelector('.layout__sidebar')
    const layoutContent = document.querySelector('.layout__content')
    const badge = document.querySelector('.list-group__item-badge')
    const labels = document.querySelectorAll('.list-group__item-label')
    const titles = document.querySelectorAll('.list-group__item-title')
    const icons = document.querySelectorAll('.list-group__icon')
    const items = document.querySelectorAll('.list-group__item')

    if (
      layoutSidebar &&
      layoutContent &&
      badge &&
      labels &&
      titles &&
      icons &&
      items
    ) {
      if (isMini) {
        icons.forEach((icon) => {
          gsap.to(icon, { display: 'block', opacity: 1, delay: 0.01 })
        })
        labels.forEach((label) => {
          gsap.to(label, { justifyContent: 'flex-start', delay: 0.02 })
        })
        titles.forEach((title) => {
          gsap.to(title, {
            display: 'block',
            opacity: 1,
            width: 0,
            delay: 0.01,
          })
        })
        items.forEach((item) => {
          gsap.to(item, {
            borderRadius: 2,
            duration: 0.1,
          })
        })
        gsap.to(badge, { top: 0, right: 0, delay: 0.01 })
      } else {
        labels.forEach((label) => {
          gsap.to(label, { justifyContent: 'center', duration: 0.1 })
        })
        icons.forEach((icon) => {
          gsap.to(icon, {
            display: 'none',
            opacity: 0,
            duration: 0.1,
          })
        })
        titles.forEach((title) => {
          let tl = gsap.timeline()
          tl.to(title, {
            opacity: 0,
            width: 0,
            duration: 0.1,
          })
          tl.to(title, { display: 'none', duration: 0.01 })
        })
        items.forEach((item) => {
          gsap.to(item, {
            borderRadius: 4,
            duration: 0.1,
          })
        })
        gsap.to(badge, { top: -10, right: -25, duration: 0.1 })
      }
    }
  }

  return (
    <div
      {...defaultDivProps}
      className={classNames(
        'sidebar dark:border-main-gray-700 dark:bg-main-gray-900',
        className
      )}
      ref={container}
    >
      <div className='sidebar__append pb-4 pt-6 dark:border-main-gray-700'>
        <a href='/' className='sidebar__logo-link flex items-center'>
          <Img
            src={Logo}
            srcSet={[Logo, LogoRetina]}
            alt='logo'
            priority={true}
            width={24}
            height={24}
          />
          <span className='sidebar__logo-title ml-2 text-heading-7 text-primary-main'>
            Logo
          </span>
        </a>
        <button
          className='sidebar__btn dark:bg-main-gray-700'
          onClick={handleClickResizeSidebar}
        >
          <ChevronLeft
            width={20}
            height={20}
            className='sidebar__btn-icon text-primary-main dark:text-main-gray-50'
          />
        </button>
      </div>
      <div className='sidebar__content'>
        <Navigation isMini={isMini} />
      </div>
    </div>
  )
}

export default Sidebar
