// useClickOutside.ts
import { useState, useEffect, RefObject } from 'react'

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  const [isOutside, setIsOutside] = useState(false)

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOutside(true)
        callback()
      } else {
        setIsOutside(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [ref, callback])

  return isOutside
}

export default useClickOutside
