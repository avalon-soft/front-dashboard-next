import React, { useLayoutEffect, useRef, useState } from 'react'
import './ListGroup.sass'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Button from './Button'
import LinkItem from './Link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { calculateTotalHeight } from '@/helpers'
import Link from 'next/link'
import useClickOutside from '@/helpers/useOnClickOutside'

interface ListGroupProps {
  title?: string
  items: any[]
  isMini: boolean
}

const ListGroup = (props: ListGroupProps) => {
  const { title, items, isMini } = props

  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(null)

  const handleClickGroup = (index: number | null) => {
    if (index === openGroupIndex) setOpenGroupIndex(null)
    else setOpenGroupIndex(index)
  }
  const drawer = useRef<HTMLUListElement>(null)
  const itemList = useRef<HTMLLIElement>(null)

  useClickOutside(itemList, () => {
    setOpenGroupIndex(null)
  })

  useGSAP(() => {
    const icon = container.current?.querySelector('.list-group__icon')
    const drawer = container.current?.querySelector('.list-group__drawer')
    let item = document.querySelector('.list-group__drawer')
    if (icon && drawer) {
      let drawerHeigth = calculateTotalHeight(item?.children)
      if (openGroupIndex) {
        gsap.to(icon, { rotate: 180, direction: 0.3 })
        gsap.to('.list-group__drawer', { height: drawerHeigth, padding: 4 })
      } else {
        gsap.to(icon, { rotate: 0, direction: 0.3 })
        gsap.to('.list-group__drawer', { height: 0, padding: 0 })
      }
    }
  }, [openGroupIndex])
  const pathname = usePathname()
  const container = useRef<HTMLUListElement>(null)

  const listItems = (items: any) => {
    return items.map((el: any, idx: number) => (
      <li
        key={idx}
        className={classNames(
          'list-group__item cursor-pointer hover:bg-primary-focus',
          {
            'bg-primary-focus': pathname === el.path,
            'list-group__item--mini': isMini,
          }
        )}
      >
        <Link
          href={el.path}
          prefetch={true}
          className={classNames({
            'text-primary-main': pathname === el.path,
          })}
        >
          {el.label}
        </Link>
      </li>
    ))
  }

  return (
    <ul ref={container} className='list-group'>
      {title && (
        <span className='list-group__title text-main-gray-700 text-caption-1 dark:text-main-gray-50'>
          {title}
        </span>
      )}
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames('list-group__item', {
            'bg-primary-focus':
              (pathname === item.path && !isMini) ||
              (pathname === item.path && isMini && !openGroupIndex) ||
              (isMini && index === openGroupIndex) ||
              (isMini &&
                item.sub_list?.some((el: any) => el.path === pathname)),
            'hover:bg-primary-focus': !openGroupIndex,
          })}
          ref={itemList}
        >
          {Boolean(item.sub_list?.length) ? (
            <>
              <Button
                item={item}
                onClick={() => handleClickGroup(index)}
                open={Boolean(openGroupIndex)}
                isMini={isMini}
              />
              <ul
                ref={drawer}
                className={classNames('list-group__drawer', {
                  'list-group__drawer--mini': isMini,
                })}
              >
                {listItems(item.sub_list)}
              </ul>
            </>
          ) : (
            <LinkItem href={item.path} item={item} prefetch={true} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default ListGroup
