'use client'

import { useTranslations } from 'next-intl'
import { SaveFilter } from './SaveFilter/SaveFilter'
import Input from '../../Form/Input/Input'
import FilterIcon from '@/app/components/Icons/Filter'
import Select from '../../Form/Select/Select'
import './Filter.sass'
import Drawer from './Drawer/Drawer'
import { useGSAP } from '@gsap/react'
import { HTMLProps, useRef, useState } from 'react'
import gsap from 'gsap'
import { calculateTotalHeight } from '@/helpers'
import classNames from 'classnames'

interface FilterProps extends HTMLProps<HTMLDivElement> {}

const Filter = (props: FilterProps) => {
  const container = useRef<HTMLDivElement>(null)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const { contextSafe } = useGSAP({ scope: container })

  const t = useTranslations('Filter')

  const handleClickDrawer = contextSafe(() => {
    let drawer = document.querySelector('.drawer-filter')
    if (drawer) {
      if (isOpenDrawer) gsap.to(drawer, { height: 0, opacity: 0 })
      else
        gsap.to(drawer, {
          height: calculateTotalHeight(drawer?.children),
          opacity: 1,
        })
    }
    setIsOpenDrawer(!isOpenDrawer)
  })

  return (
    <div {...props}>
      <div className='dark:bg-main-gray-600 mt-6 flex filter'>
        <Input
          id={'searchField'}
          label={''}
          register={
            {
              // ...register('searchField', {}),
            }
          }
          error={undefined}
          type='text'
          name='searchField'
          placeholder='Search...'
          prependInnerIcon='Search'
          className='w-full'
          isFill={Boolean()}
          propsAppendIconButton={{ onClick: () => {} }}
        />
        <Select
          options={[
            { label: 'Saved filter', value: 'Saved filter' },
            { label: 'Saved filter2', value: 'Saved filter2' },
          ]}
          placeholder={t('savedFilters')}
          className='filter__react-select-container'
          classNamePrefix='filter__react-select'
        />
        <button
          onClick={() => handleClickDrawer()}
          className={classNames(
            'filter__btn rounded-r-sm border border-primary-main p-2 hover:bg-primary-main',
            {
              'bg-primary-main': isOpenDrawer,
            }
          )}
        >
          <FilterIcon
            width={24}
            height={24}
            className={classNames('filter__icon', {
              'text-main-gray-50': isOpenDrawer,
              'text-primary-main': !isOpenDrawer,
            })}
          />
        </button>
      </div>
      <Drawer ref={container} />
      <SaveFilter />
    </div>
  )
}

export default Filter
