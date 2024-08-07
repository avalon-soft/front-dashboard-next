import React, { useRef, useState } from 'react'

import SearchIcon from '@/app/components/icons/Search'
import Input from '@/app/components/Form/Input/Input'
import { useForm } from 'react-hook-form'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Search.sass'

const Search = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ searchField: string }>()

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)
    // try {
    //   const { data } = await auth.post(endpoints.token, {
    //     ...values,
    //   })
    //   addAuthHeader(data)
    //   window.localStorage.setItem('session', JSON.stringify(data))
    //   push(`/${locale}/dashboard`)
    // } finally {
    //   setIsSubmitting(false)
    // }
  }
  const { searchField } = watch()
  const container = useRef<any>(undefined)

  const { contextSafe } = useGSAP({ scope: container })

  const handleClickVisibleSearch = contextSafe(() => {
    if (isActive) {
      gsap.fromTo(
        '.search__form',
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.1, delay: 0.2 }
      )
      gsap.to('.search__icon', { opacity: 0, duration: 0.1 })
    } else {
      console.log('open :>> ')
      gsap.fromTo(
        '.search__form',
        { x: 0, opacity: 1, duration: 0.1 },
        { x: '100%', opacity: 0 }
      )
      gsap.to('.search__icon', { opacity: 1, delay: 0.3 })
    }
    setIsActive(!isActive)
  })

  return (
    <div ref={container} className='search w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='search__form'>
        <Input
          id={'searchField'}
          label={''}
          register={{
            ...register('searchField', {}),
          }}
          error={errors.searchField}
          type='text'
          name='searchField'
          placeholder='Search...'
          appendInnerIcon='Close'
          colorIcon='text-error-main'
          isFill={Boolean(searchField)}
          propsAppendIconButton={{ onClick: handleClickVisibleSearch }}
        />
      </form>
      <button onClick={handleClickVisibleSearch}>
        <SearchIcon
          width={24}
          height={24}
          className='dark:text-main-gray-50 search__icon'
        />
      </button>
    </div>
  )
}

export default Search
