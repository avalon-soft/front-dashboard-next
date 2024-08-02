'use client'
import { addAuthHeader, auth } from '@/api'
import { endpoints } from '@/api/endpoints'
import Input from '@/app/components/Form/Input/Input'
import LoadingButton from '@/app/components/Form/LoadingButton/LoadingButton'
import ChevronLeft from '@/app/components/icons/ChevronLeft'
import ProgressCheck from '@/app/components/icons/ProgressCheck'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Registration = () => {
  const t = useTranslations('SignInPage')
  const locale = useLocale()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ username: string; password: string; confirmPassword: string }>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(0)

  const { push } = useRouter()

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      const { data } = await auth.post(endpoints.token, {
        ...values,
      })
      addAuthHeader(data)
      window.localStorage.setItem('session', JSON.stringify(data))
      push(`/${locale}/dashboard`)
    } finally {
      setIsSubmitting(false)
    }
  }
  const { username, password, confirmPassword } = watch()
  return step === 0 ? (
    <>
      <div className='my-8 w-full justify-start'>
        <h1 className='text-heading-6'>{t('signUp')}</h1>
        <h2 className='text-body-w mt-3'>{t('createYourAccount')}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id={'username'}
          label={t('email')}
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
          preIcon='Mail'
        />
        <Input
          id={'password'}
          label={t('password')}
          register={{
            ...register('password', {
              required: 'This is required field',
            }),
          }}
          error={errors.password}
          type='password'
          name='password'
          placeholder='Password'
          isFill={Boolean(password)}
          preIcon='Lock'
          className='mb-4'
        />
        <Input
          id={'confirmPassword'}
          label={t('confirmPassword')}
          register={{
            ...register('confirmPassword', {
              required: 'This is required field',
            }),
          }}
          error={errors.password}
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          isFill={Boolean(confirmPassword)}
          preIcon='Lock'
          className='mb-4'
        />
        <LoadingButton
          isLoading={isSubmitting}
          type='submit'
          className='login__form-button bg-primary-main hover:bg-primary-hover text-main-gray-50 text-button-1 mt-8 w-full px-4 py-3'
          disabled={isSubmitting}
        >
          {t('signUp')}
        </LoadingButton>
      </form>
      <div className='mt-4 flex items-center justify-center'>
        <span className='text-body-2 mr-2'>{t('alreadyHaveAnAccount')}</span>
        <a
          href={`/${locale}/login`}
          className='text-primary-main hover:text-primary-hover flex items-center justify-center'
        >
          <span className='text-subtitle-1'>Back to log in</span>
        </a>
      </div>
    </>
  ) : (
    <>
      <div className='bg-success-main w-content mx-auto rounded-full p-1'>
        <ProgressCheck
          className='text-main-blue-gray-50'
          width={40}
          height={40}
        />
      </div>
      <h1 className='text-heading-6 mt-6 text-center'>
        {t('successfullRegistration')}
      </h1>
      <p className='text-body-2 mb-8 mt-4 text-center'>
        {t('textForSuccessRegistration')}
        <br />
        <span className='text-primary-main'>{username}</span>.
      </p>
      <p className='text-body-2 text-center'>
        {t('DidntGetTheLink')}?
        <button className='text-primary-main text-subtitle-2 ml-2'>
          {t('SendMore')}
        </button>
      </p>
    </>
  )
}

export default Registration
