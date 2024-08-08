import React from 'react'
import CircleSpinner from '../../CircleSpinner/CircleSpinner'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
}

const LoadingButton = ({ children, isLoading, ...defaultButtonProps }: LoadingButtonProps) => (
  <button {...defaultButtonProps}>{isLoading ? <CircleSpinner /> : children}</button>
)

export default LoadingButton
