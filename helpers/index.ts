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
