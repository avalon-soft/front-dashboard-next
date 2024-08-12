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

interface ListGroupProps {
  title?: string
  items: any[]
}

const ListGroup = (props: ListGroupProps) => {
  const { title, items } = props

  const [isOpenGroup, setIsOpenGroup] = useState(false)
  const handleClickGroup = () => {
    setIsOpenGroup(!isOpenGroup)
  }
  useGSAP(() => {
    const icon = container.current?.querySelector('.list-group__icon')
    const drawer = container.current?.querySelector('.list-group__drawer')
    let item = document.querySelector('.list-group__drawer')
    if (icon && drawer) {
      let drawerHeigth = calculateTotalHeight(item?.children)
      if (isOpenGroup) {
        gsap.to(icon, { rotate: 180, direction: 0.3 })
        gsap.to('.list-group__drawer', { height: drawerHeigth })
      } else {
        gsap.to(icon, { rotate: 0, direction: 0.3 })
        gsap.to('.list-group__drawer', { height: 0 })
      }
    }
  }, [isOpenGroup])
  const pathname = usePathname()
  const container = useRef<HTMLUListElement>(null)
  const drawer = useRef<HTMLUListElement>(null)

  const listItems = (items: any) => {
    return items.map((el: any, idx: number) => (
      <li
        key={idx}
        className={classNames(
          'list-group__item cursor-pointer hover:bg-primary-focus',
          { 'bg-primary-focus': pathname === el.path }
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
            'bg-primary-focus': pathname === item.path,
            'hover:bg-primary-focus': !isOpenGroup,
          })}
        >
          {Boolean(item.sub_list?.length) ? (
            <>
              <Button
                item={item}
                onClick={handleClickGroup}
                open={isOpenGroup}
              />
              <ul ref={drawer} className='list-group__drawer'>
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
