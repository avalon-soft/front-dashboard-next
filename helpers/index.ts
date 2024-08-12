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
