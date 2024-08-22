'use client'

import { addAuthHeader } from '@/api'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {

  const [isSession, setIsSession] = useState<{ access_token: string }>()
  useEffect(() => {
    'session' in window.localStorage &&
      setIsSession(JSON.parse(localStorage.getItem('session') || ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSession) {
      addAuthHeader(isSession)
    }
  }, [isSession])


  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeProvider>
  )
}
