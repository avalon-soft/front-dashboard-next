import Badge from '@/app/components/Badge/Badge'
import ChevronDown from '@/app/components/Icons/ChevronDown'
import React from 'react'
import Icon from '@/app/components/Form/Input/InnerIcon'
import classNames from 'classnames'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    label: string
    badge: string | number
    icon: string
  }
  open: boolean
}

const Button = (props: ButtonProps) => {
  const { item, open, ...defaulButtonProps } = props
  const { label, badge, icon } = item

  return (
    <button
      {...defaulButtonProps}
      className={classNames('flex w-full items-center justify-between', {
        'mb-4 border-b border-b-primary-main pb-3': open,
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
                'mb-1 text-primary-main': open,
              })
            }
          />
        )}
        <span
          className={classNames('ml-2 text-body-2 dark:text-main-gray-50', {
            'text-primary-main': open,
            'text-main-gray-900': !open,
          })}
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
          'text-primary-main': open,
        })}
      />
    </button>
  )
}

export default Button
