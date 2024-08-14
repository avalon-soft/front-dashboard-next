import Badge from '@/app/components/Badge/Badge'
import React from 'react'
import Icon from '@/app/components/Form/Input/InnerIcon'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
interface LinkItemProps extends LinkProps {
  item: {
    label: string
    badge: string | number
    icon: string
    path: string
  }
}

const LinkItem = (props: LinkItemProps) => {
  const { item, ...defaulLinkProps } = props
  const { label, badge, icon, path } = item

  const pathname = usePathname()
  return (
    <Link
      {...defaulLinkProps}
      className='flex w-full items-center justify-between'
    >
      <div className='list-group__item-label'>
        {icon && (
          <Icon
            width={16}
            height={16}
            componentName={icon}
            className={classNames('text-status-text-gray', {
              'text-primary-main': pathname === path,
            })}
          />
        )}
        <span
          className={classNames(
            'list-group__item-title ml-2 text-body-2 text-main-gray-900 dark:text-main-gray-50',
            { 'text-primary-main': pathname === path }
          )}
        >
          {label}
        </span>
        {Boolean(badge) && (
          <Badge count={badge} className='list-group__item-badge px-1' />
        )}
      </div>
    </Link>
  )
}

export default LinkItem
