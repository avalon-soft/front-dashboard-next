'use client'
import React, { useEffect, useState } from 'react'
import Chip from '../../../Chip/Chip'
import { useTranslations } from 'next-intl'
import { useFilterStore } from '@/stores/filterStore'

import './SaveFilter.sass'
import { clearObject, getKeysObject } from '@/helpers'
import { useSearchParams } from 'next/navigation'
import useQueryParams from '@/hooks/useQueryParams'

export const SaveFilter = () => {
  const t = useTranslations('Filter')
  const [list, setList] = useState<any[]>([])
  const { filters } = useFilterStore()
  const handleClickRemove = (index: number) => {
    let newList = list.filter((item, i) => {
      console.log('item :>> ', item)
      return i !== index
    })
    setList([...newList])
  }

  useEffect(() => {
    setList([...filters])
  }, [filters])
  const queryParams = useQueryParams()
  return (
    Boolean(getKeysObject(clearObject(list)).length) && (
      <div className='mb-4 flex items-center justify-between py-2'>
        <div className='flex items-center'>
          <span className='text-caption-1 text-main-gray-700'>
            {t('savedFilter')}:
          </span>
          {list.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              close={() => handleClickRemove(index)}
            />
          ))}
        </div>
        <button
          onClick={() => setList([])}
          className='rounded px-4 py-2 text-subtitle-1 text-primary-main hover:border-primary-border hover:bg-primary-hover hover:text-main-gray-50'
        >
          {t('clearAll')}
        </button>
      </div>
    )
  )
}
