'use client'
import { addAuthHeader, api } from '../../../../api'
import { endpoints } from '../../../../api/endpoints'
import Input from '../../../components/Form/Input/Input'
import LoadingButton from '../../../components/Form/LoadingButton/LoadingButton'
import ChevronLeft from '../../../components/Icons/ChevronLeft'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const ForgotPassword = () => {
  const t = useTranslations('SignInPage')
  const locale = useLocale()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ username: string }>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { push } = useRouter()

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      const { data } = await api.post(endpoints.auth.token, {
        ...values,
      })
      addAuthHeader(data)
      window.localStorage.setItem('session', JSON.stringify(data))
      push(`/${locale}/dashboard`)
    } finally {
      setIsSubmitting(false)
    }
  }
  const { username } = watch()
  return (
    <>
      <div className='my-8 w-full justify-start'>
        <h1 className='text-heading-6'>{t('forgotPassword')}</h1>
        <h2 className='text-body-w mt-3'>{t('enterTheEmail')}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id={'username'}
          label={'Email'}
          register={{
            ...register('username', {
              required: 'This is required field',
              // pattern: {
              //   value: /\S+@\S+\.\S+/,
              //   message: 'Please correct your Email',
              // },
            }),
          }}
          error={errors.username}
          type='text'
          name='username'
          placeholder='Placeholder@mail.com'
          isFill={Boolean(username)}
          className='mb-4'
          prependInnerIcon='Mail'
        />
        <LoadingButton
          isLoading={isSubmitting}
          type='submit'
          className='login__form-button mt-8 w-full bg-primary-main px-4 py-3 text-button-1 text-main-gray-50 hover:bg-primary-hover'
          disabled={isSubmitting}
        >
          {t('sendAPasword')}
        </LoadingButton>
      </form>
      <a
        href={`/${locale}/login`}
        className='mt-4 flex items-center justify-center text-primary-main hover:text-primary-hover'
      >
        <ChevronLeft width={24} height={25} />
        <span className='text-subtitle-1'>{t('backToLogin')}</span>
      </a>
    </>
  )
}

export default ForgotPassword
