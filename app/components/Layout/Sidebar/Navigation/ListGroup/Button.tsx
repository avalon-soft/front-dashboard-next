import Badge from '@/app/components/Badge/Badge'
import ChevronDown from '@/app/components/Icons/ChevronDown'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Icon from '@/app/components/Form/Input/InnerIcon'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    label: string
    badge: string | number
    icon: string
    sub_list: { path: string }[]
  }
  open: boolean
  isMini: boolean
}

const Button = (props: ButtonProps) => {
  const { item, open, isMini, ...defaulButtonProps } = props
  const { label, badge, icon } = item
  const pathname = usePathname()
  return (
    <button
      {...defaulButtonProps}
      className={classNames('flex w-full items-center justify-between', {
        'mb-4 border-b border-b-primary-main pb-3':
          (open && !isMini) ||
          (!isMini && item.sub_list.some((el) => el.path === pathname)),
      })}
    >
      <div className='list-group__item-label'>
        {icon && (
          <Icon
            width={16}
            height={16}
            componentName={icon}
            className={
              (classNames('text-status-text-gray'),
              {
                'text-status-text-gray': !open,
                'mb-1 text-primary-main':
                  open ||
                  (!isMini && item.sub_list.some((el) => el.path === pathname)),
              })
            }
          />
        )}
        <span
          className={classNames(
            'list-group__item-title ml-2 text-body-2 dark:text-main-gray-50',
            {
              'text-primary-main':
                open ||
                (!isMini && item.sub_list.some((el) => el.path === pathname)),
              'text-main-gray-900': !open,
            }
          )}
        >
          {label}
        </span>
        {Boolean(badge) && (
          <Badge count={badge} className='list-group__item-badge px-1' />
        )}
      </div>
      <ChevronDown
        width={16}
        height={16}
        className={classNames('list-group__icon ml-2 dark:text-main-gray-50', {
          'text-status-text-gray': !open,
          'text-primary-main':
            open ||
            (!isMini && item.sub_list.some((el) => el.path === pathname)),
        })}
      />
    </button>
  )
}

export default Button
