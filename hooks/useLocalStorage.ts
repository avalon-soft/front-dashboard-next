import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key)
      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : initialValue
    }
    return initialValue
  })

  useEffect(() => {
    const handleValueChange = (newValue: string | null) => {
      if (newValue !== null) {
        setValue(JSON.parse(newValue))
      }
    }

    const unsubscribe = storageEventEmitter.subscribe(key, handleValueChange)

    return () => {
      unsubscribe()
    }
  }, [key])

  const setStoredValue = (newValue: T) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(newValue))
      setValue(newValue)
      storageEventEmitter.emit(key, JSON.stringify(newValue))
    }
  }

  return [value, setStoredValue] as const
}

type Callback = (value: string | null) => void

interface StorageEventEmitter {
  _events: Record<string, Callback[]>

  emit(key: string, value: string | null): void
  subscribe(key: string, callback: Callback): () => void
}

const storageEventEmitter: StorageEventEmitter = {
  _events: {},

  emit(key, value) {
    if (this._events[key]) {
      this._events[key].forEach((callback) => callback(value))
    }
  },

  subscribe(key, callback) {
    if (!this._events[key]) {
      this._events[key] = []
    }
    this._events[key].push(callback)

    return () => {
      this._events[key] = this._events[key].filter((cb) => cb !== callback)
    }
  },
}
