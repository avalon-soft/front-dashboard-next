import { useState, useEffect } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Set initial state
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline === undefined) return null

  return isOnline
}

export default useOnlineStatus
