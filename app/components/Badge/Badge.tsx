import React, { HTMLProps } from 'react'
import './Badge.sass'
import classNames from 'classnames'

interface BadgeProps extends HTMLProps<HTMLSpanElement> {
  count?: string | number
}

const Badge = (props: BadgeProps) => {
  const { count, className, ...defaultSpanProps } = props
  return <span {...defaultSpanProps} className={classNames('badge text-main-gray-50 text-body-3', className)}>{count}</span>
}

export default Badge
