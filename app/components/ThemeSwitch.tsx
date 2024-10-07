'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ToggleSwitch from './Form/ToggleSwitch/ToggleSwitch'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    console.log('resolvedTheme :>> ', resolvedTheme)
    resolvedTheme === 'dark' && setIsChecked(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClick = (state: boolean) => {
    setTheme(state ? 'dark' : 'light')
    setIsChecked(state)
  }
  if (!mounted) return null
  return (
    <ToggleSwitch
      checked={isChecked}
      onChange={() => handleClick(!isChecked)}
    />
  )
}
