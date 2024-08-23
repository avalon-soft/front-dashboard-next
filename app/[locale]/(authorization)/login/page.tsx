'use client'
import { useForm } from 'react-hook-form'

import Input from '@/app/components/Form/Input/Input'
import { useActionState, useState } from 'react'
import LoadingButton from '@/app/components/Form/LoadingButton/LoadingButton'
import { useTranslations, useLocale } from 'next-intl'
import Checkbox from '@/app/components/Form/Checkbox/Checkbox'
import { addAuthHeader, api } from '@/api'
import { useRouter } from 'next/navigation'
import { endpoints } from '@/api/endpoints'
import { signIn } from './actions'
interface ILoginValues {
  email: string
  password: string
}

export default function Login() {
  const t = useTranslations('SignInPage')
  const locale = useLocale()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginValues>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { push } = useRouter()

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)
    const { token, base } = endpoints
    try {
      const response = await api.post(base + token, {
        ...values,
      })

      response?.data && signIn(response.data.access_token)
      addAuthHeader(response.data)
      localStorage.setItem('session', JSON.stringify(response.data))
    } finally {
      setIsSubmitting(false)
    }
  }
  const { email, password } = watch()

  return (
    <>
      <>
        <div className='my-8 w-full justify-start'>
          <h1 className='text-heading-6'>Sign in</h1>
          <h2 className='text-body-w mt-3'>
            Enter your account details below.
          </h2>
        </div>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id={'email'}
            label={'Email'}
            register={{
              ...register('email', {
                required: 'This is required field',
                // pattern: {
                //   value: /\S+@\S+\.\S+/,
                //   message: 'Please correct your Email',
                // },
              }),
            }}
            error={errors.email}
            type='text'
            name='email'
            placeholder='Placeholder@mail.com'
            isFill={Boolean(email)}
            className='mb-4'
            prependInnerIcon='Mail'
          />
          <Input
            id={'password'}
            label={'Password'}
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
            prependInnerIcon='Lock'
            className='mb-4'
          />
          <div className='flex items-center justify-between'>
            <Checkbox label={t('rememberMe')} />
            <a
              href={`/${locale}/forgot-password`}
              lang={locale}
              className='text-subtitle-2 text-primary-main'
            >
              {t('forgotPassword')}?
            </a>
          </div>
          <LoadingButton
            isLoading={isSubmitting}
            type='submit'
            className='mt-8 w-full rounded bg-primary-main px-4 py-3 text-button-1 text-main-gray-50 hover:bg-primary-hover'
            disabled={isSubmitting}
          >
            {t('signin')}
          </LoadingButton>
        </form>
      </>
      <div className='mt-5 text-center'>
        <span className='text-body-2'>{t('dontHaveAnAccountYet')}</span>
        <a
          href={`/${locale}/registration`}
          lang={locale}
          className='ml-2 text-subtitle-2 text-primary-main hover:text-primary-main'
        >
          {t('registration')}
        </a>
      </div>
    </>
  )
}
