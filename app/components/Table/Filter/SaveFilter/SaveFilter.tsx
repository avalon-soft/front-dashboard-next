import React from 'react'
import Chip from '../../../Chip/Chip'
import { useTranslations } from 'next-intl'

import './SaveFilter.sass'

export const SaveFilter = () => {
  const t = useTranslations('Filter')
  const handleClickClose = () => {}

  return (
    <div className='mb-4 flex items-center justify-between py-2'>
      <div className='flex items-center'>
        <span className='text-caption-1 text-main-gray-700'>
          {t('savedFilter')}:
        </span>
        <Chip label='Chips title' close={handleClickClose} />
      </div>
      <button className='rounded px-4 py-2 text-subtitle-1 text-primary-main hover:border-primary-border hover:bg-primary-hover hover:text-main-gray-50'>
        {t('clearAll')}
      </button>
    </div>
  )
}
