import React, { useLayoutEffect, useState } from 'react'

interface SkeletonProps {
  cols: number
}

const Skeleton = (props: SkeletonProps) => {
  const { cols } = props
  const [array, setArray] = useState<number[]>([])
  useLayoutEffect(() => {
    let array = Array.from({ length: cols }, (_, index) => index + 1)
    setArray(array)
    console.log('array :>> ', array)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return array.map((row) => (
    <tr key={row} className='table__body-tr h-10 border border-primary-border'>
      {array.map((col) => (
        <td key={col} className='table__body-td'>
          <div role='status' className='max-w-sm animate-pulse'>
            <div className='h-2 max-w-[360px] rounded-full bg-main-gray-200 dark:bg-main-gray-700'></div>
            <span className='sr-only'>Loading...</span>
          </div>
        </td>
      ))}
    </tr>
  ))
}

export default Skeleton
