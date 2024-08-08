import React, { HTMLProps } from 'react'
import './Badge.sass'
import classNames from 'classnames'

interface BadgeProps extends HTMLProps<HTMLSpanElement> {
  count?: string
}

const Badge = (props: BadgeProps) => {
  const { count, className, ...defaultSpanProps } = props
  return <span {...defaultSpanProps} className={classNames('badge', className)}>{count}</span>
}

export default Badge
