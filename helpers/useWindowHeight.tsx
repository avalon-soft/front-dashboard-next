import { useState, useEffect } from 'react'

const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowHeight
}

export default useWindowHeight
