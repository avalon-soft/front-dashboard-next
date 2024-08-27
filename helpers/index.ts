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
  if (object && Object.keys(object).length) {
    deleteKey.forEach((key) => delete object[key])
    let params = new URLSearchParams()
    Object.entries(object).forEach(([key, value]) => {
      if (key !== 'undefined') {
        if (Array.isArray(value)) params.set(key, value.join())
        else params.set(key, value as string)
      }
    })
    return `?${params}`
  } else return ''
}

export function calculateTotalHeight2(elements: any, height: any) {
  let totalHeight = 0
  for (let element of elements) {
    if ('data-table__scroll-container' !== element.classList[0]) {
      totalHeight = totalHeight + element.offsetHeight
    }
  }
  return height - totalHeight
}
