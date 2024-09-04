'use client'

import { useTranslations } from 'next-intl'
import SaveFilter from './SaveFilter/SaveFilter'
import Input from '../../Form/Input/Input'
import FilterIcon from '@/app/components/Icons/Filter'
import Select from '../../Form/Select/Select'
import './Filter.sass'
import Drawer from './Drawer/Drawer'
import { useGSAP } from '@gsap/react'
import { HTMLProps, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { calculateTotalHeight, queryString } from '@/helpers'
import classNames from 'classnames'
import { IQueryParams } from '@/types'
import { useFilterStore } from '@/stores/filterStore'

interface FilterProps extends HTMLProps<HTMLDivElement> {
  loadData: (params?: IQueryParams) => void
}

const Filter = (props: FilterProps) => {
  const { loadData, ...otherProps } = props

  const { filters, chooseFilter, setChooseFilter, removeChooseFilter } =
    useFilterStore()

  const container = useRef<HTMLDivElement>(null)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const { contextSafe } = useGSAP({ scope: container })

  useEffect(() => {
    if ('isPin' in window.localStorage) {
      handleClickDrawer()
    }
    return () => {
      removeChooseFilter()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  const handleChooseFilter = (option: any) => {
    setChooseFilter(option)
    !isOpenDrawer && handleClickDrawer()
  }
  const saveFilterContainer = useRef<any>(null)

  const saveFilterGSAP = useGSAP({ scope: saveFilterContainer })
  const handleClickDisplayChips = saveFilterGSAP.contextSafe(() => {
    if (saveFilterContainer.current) {
      gsap.to(saveFilterContainer.current, { opacity: 1, height: '100%' })
    }
  })

  return (
    <div {...otherProps}>
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
          options={filters}
          onChange={(option) => handleChooseFilter(option)}
          value={chooseFilter}
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
      <Drawer
        ref={container}
        loadData={(value) => {
          loadData(value)
          handleClickDisplayChips()
        }}
        savedFilter={chooseFilter}
      />
      <SaveFilter ref={saveFilterContainer} />
    </div>
  )
}

export default Filter
