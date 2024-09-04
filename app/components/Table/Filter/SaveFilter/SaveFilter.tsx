'use client'
import React, { forwardRef, HTMLProps, useRef } from 'react'
import Chip from '../../../Chip/Chip'
import { useTranslations } from 'next-intl'

import './SaveFilter.sass'
import { clearObject, queryString } from '@/helpers'
import useQueryParams from '@/hooks/useQueryParams'
import { usePathname, useRouter } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import './SaveFilter.sass'
import classNames from 'classnames'

const EXCLUDE_KEYS = ['page', 'size', 'order', 'orderBy']

interface SaveFilterProps extends HTMLProps<HTMLDivElement> {}

const SaveFilter = forwardRef<HTMLDivElement, SaveFilterProps>(
  (props, ref) => {
    let query = useQueryParams()
    const path = usePathname()
    const { replace } = useRouter()
    const t = useTranslations('Filter')
    const chip = useRef<HTMLDivElement>(null)

    const chipGSAP = useGSAP({ scope: chip })

    // useGSAP(() => {
    //   if (
    //     Object.keys(query).filter((key) => !EXCLUDE_KEYS.includes(key)).length > 0
    //   ) {
    //     let el = document.querySelector('.save-filter')
    //     if (el) gsap.to(el, { opacity: 1, height: '100%' })
    //   }
    // })
    // useGSAP(() => {
    //   if (
    //     Object.keys(query).filter((key) => !EXCLUDE_KEYS.includes(key)).length ===
    //     0
    //   ) {
    //     let el = document.querySelector('.save-filter')
    //     if (el) gsap.to(el, { opacity: 0, height: 0 })
    //   }
    // }, [query])

    const handleClickRemove = chipGSAP.contextSafe((key: string) => {
      let item = document.querySelector(`.save-filter__chip-${key}`)
      if (item) {
        gsap.to(item, {
          width: 0,
          opacity: 0,
          onComplete: () => {
            let copyQuery = { ...query }
            delete copyQuery[key]
            replace(path + queryString(copyQuery))
          },
        })
      }
    })

    useGSAP(() => {
      if (
        (ref as { current: any })?.current &&
        Object.keys(query).filter((key) => !EXCLUDE_KEYS.includes(key))
          .length === 0
      ) {
        gsap.to(ref, { opacity: 0, height: 0 })
      }
    }, [query])

    const handleClickClearAll = () => {
      let copyQuery = { ...query }
      Object.keys(copyQuery).forEach((key) => {
        if (!EXCLUDE_KEYS.includes(key)) delete copyQuery[key]
      })
      replace(path + queryString(clearObject))
    }

    return (
      <div
        ref={ref}
        {...props}
        className='save-filter mb-4 flex items-center justify-between py-2'
      >
        <div className='flex items-center'>
          <span className='text-caption-1 text-main-gray-700'>
            {t('savedFilter')}:
          </span>
          {Object.keys(query)
            .filter((key) => !EXCLUDE_KEYS.includes(key))
            .map((item, index) => (
              <Chip
                ref={chip}
                key={index}
                label={query[item]}
                className={classNames(
                  'save-filter__chip',
                  `save-filter__chip-${item}`
                )}
                close={() => handleClickRemove(item)}
              />
            ))}
        </div>
        <button
          onClick={() => handleClickClearAll()}
          className='rounded px-4 py-2 text-subtitle-1 text-primary-main hover:border-primary-border hover:bg-primary-hover hover:text-main-gray-50'
        >
          {t('clearAll')}
        </button>
      </div>
    )
  }
)

SaveFilter.displayName = 'SaveFilter'

export default SaveFilter