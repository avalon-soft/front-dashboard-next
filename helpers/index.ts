export function getFirstLetter(str: string) {
  if (typeof str === 'string' && str.length > 0) {
    return str.charAt(0)
  }
  return null // Можна повернути будь-яке значення, яке ви хочете, наприклад, пустий рядок або повідомлення про помилку.
}
export function isOnline() {
  return navigator.onLine
}

export function calculateTotalHeight(elements: any) {
  let totalHeight = 0
  for (let element of elements) {
    let height = element.offsetHeight
    totalHeight += height
  }
  return totalHeight
}

export const getColorStatus = (status: any) => {
  switch (status) {
    case 'success':
      return 'text-status-text-green bg-status-green'
    case 'in progress':
      return 'text-status-text-orange bg-status-orange'
    case 'error':
      return 'text-status-text-red bg-status-red'
    case 'created':
      return 'text-status-text-deep-purple bg-status-deep-purple'
    // case 'in progress':
    //   return 'text-status-text- bg-status-'
    default:
      return 'text-status-text-gray bg-status-gray'
  }
}

export function queryString(object: any, deleteKey = []) {
  let newClearObject = clearObject(object)
  if (newClearObject && Object.keys(newClearObject).length) {
    deleteKey.forEach((key) => delete newClearObject[key])
    let params = new URLSearchParams()
    Object.entries(newClearObject).forEach(([key, value]) => {
      if (key !== 'undefined') {
        if (Array.isArray(value)) params.set(key, value.join())
        else params.set(key, value as string)
      }
    })
    return `?${params}`
  } else return ''
}

export function clearObject(
  object: Record<string, any>, // типізація для вхідного об'єкта
  exclude: string[] = [] // типізація для масиву виключень
): Record<string, any> {
  // типізація для об'єкта, що повертається
  if (typeof object === 'object') {
    Object.entries(object).forEach(([key, value]) => {
      if (
        (value === null || value === undefined || value === '') &&
        !exclude.includes(key)
      ) {
        delete object[key]
      } else if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !exclude.includes(key)
      ) {
        if (!Object.keys(object[key]).length) {
          delete object[key]
        } else {
          object[key] = { ...clearObject(object[key], exclude) }
        }
      } else if (Array.isArray(value) && !exclude.includes(key)) {
        object[key] = value.map((el) => {
          return { ...clearObject(el, exclude) }
        })
      }
      if (
        value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length &&
        !exclude.includes(key)
      ) {
        delete object[key]
      }
    })
  }
  return object
}

export function getRandomHexColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const getKeysObject = ( obj: { [key: string]: any } ) => {
  if (typeof obj === 'object') {
    return Object.keys(obj)
  }
  return []

}